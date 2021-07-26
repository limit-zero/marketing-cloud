const gql = require('graphql-tag');
const eachOfSeries = require('async/eachOfSeries');
const createApollo = require('./apollo');
const slug = require('./slug');
const getClientName = require('./get-client-name');

const chunkArray = (array, size, mapper, formatter) => {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    const slice = array.slice(index, size + index);
    const mapped = mapper ? slice.map(mapper) : slice;
    const formatted = formatter ? formatter(mapped) : mapped;
    chunked.push(formatted);
    index += size;
  }
  return chunked;
};

const { log } = console;

module.exports = async ({ collection } = {}) => {
  log('Syncing emails...');

  // find most recent insert
  const last = await collection.findOne({
    clientId: 7323587, // NOTE: THIS MUST BE SET TO THE CURRENT BU
    assetId: { $exists: false },
  }, {
    sort: { emailId: -1 },
    projection: { emailId: 1 },
  });

  const lastEmailId = last ? last.emailId : null;

  const run = async ({ requestId } = {}) => {
    log(`Retrieve emails for request ID ${requestId}`);
    const query = gql`
      query RetrieveEmails($requestId: String) {
        emails(input: { continueRequest: $requestId }) {
          pageInfo {
            requestId,
            hasMoreData
          }
          edges {
            node {
              id
            }
          }
        }
      }
    `;
    const variables = { requestId };
    const { data } = await createApollo().query({ query, variables });
    log('Emails retrieved. Being processing');

    // process here!
    const chunks = chunkArray(data.emails.edges, 100, (edge) => edge.node.id);

    await eachOfSeries(chunks, async (ids, index) => {
      const num = index + 1;
      log(`Handling chunk ${num} of ${chunks.length} for ${requestId} (IDs ${ids[0]} - ${ids[ids.length - 1]})...`);

      const ops = await Promise.all(ids.map(async (id) => {
        // skip items that have been inserted.
        if (lastEmailId && id < lastEmailId) return null;

        const emailRes = await createApollo().query({
          variables: { id },
          query: gql`
            query GetEmail($id: Int!) {
              email(input: { id: $id }) {
                id
                name
                clientId
                dataFolder {
                  id
                  fullName
                }
                createdDate
                modifiedDate
                html
              }
            }
          `,
        });
        const { email: result } = emailRes.data;
        const {
          clientId,
          id: emailId,
          dataFolder,
          createdDate,
          modifiedDate,
        } = result;
        if (!clientId || !emailId) throw new Error('The email ID and client ID are required.');

        if (result.html == null) {
          log('NO HTML FOUND FOR', emailId);
          return null;
        }

        const entity = `exact-target.${result.clientId}.email*${emailId}`;

        const folderPath = dataFolder.fullName.split('>').map((v) => slug(v)).filter((v) => v).join('/');
        const filter = { entity };

        const clientName = getClientName(clientId);

        const $set = {
          emailId,
          client: {
            id: clientId,
            name: clientName,
            slug: slug(clientName),
          },
          name: result.name,
          slug: slug(result.name),
          html: result.html,
          dataFolder: {
            id: dataFolder.id,
            name: dataFolder.fullName,
            path: folderPath,
          },
          ...(createdDate && { createdDate: new Date(createdDate) }),
          ...(modifiedDate && { modifiedDate: new Date(modifiedDate) }),
          lastRetrievedAt: new Date(),
        };
        const update = { $set };
        return { updateOne: { filter, update, upsert: true } };
      }));

      const bulkOps = ops.filter((op) => op);
      if (bulkOps.length) await collection.bulkWrite(bulkOps);
      log(`Chunk ${num} complete for ${requestId}`);
    });

    // then handle more results
    const { pageInfo } = data.emails;
    if (pageInfo.hasMoreData) await run({ requestId: pageInfo.requestId });
  };

  await run();

  log('Email sync complete.');
};
