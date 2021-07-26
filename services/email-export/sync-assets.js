const gql = require('graphql-tag');
const apollo = require('./apollo');
const batch = require('./batch');
const slug = require('./slug');

const { log } = console;

module.exports = async ({ collection } = {}) => {
  log('Syncing email assets...');
  const pageSize = 100;

  const countResult = await apollo.query({
    query: gql`
      query {
        emailAssets(input: { pageSize: 1 }) {
          totalCount
        }
      }
    `,
  });
  const { totalCount } = countResult.data.emailAssets;

  const retriever = async ({ page }) => {
    const query = gql`
      query RetrieveAssets($page: Int!, $pageSize: Int!) {
        emailAssets(input: { pageSize: $pageSize, page: $page }) {
          edges {
            id
            emailId
            clientId
            name
            html
            createdDate
            modifiedDate
            dataFolder {
              id
              fullName
            }
          }
        }
      }
    `;

    const variables = { pageSize, page };
    const { data } = await apollo.query({ query, variables });
    return data.emailAssets.edges;
  };

  const handler = async ({ results }) => {
    const bulkOps = results.map((result) => {
      const {
        clientId,
        emailId,
        dataFolder,
        createdDate,
        modifiedDate,
      } = result;
      if (!clientId || !emailId) throw new Error('The email ID and client ID are required.');
      const entity = `exact-target.${result.clientId}.email*${result.emailId}`;

      const folderPath = dataFolder.fullName.split('>').map((v) => slug(v)).filter((v) => v).join('/');
      const filter = { entity };
      const $set = {
        emailId,
        clientId,
        assetId: result.id,
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
    });
    if (bulkOps.length) await collection.bulkWrite(bulkOps);
  };

  await batch({
    name: 'sync-email-assets',
    totalCount,
    limit: pageSize,
    handler,
    retriever,
  });
  log('Email asset sync complete.');
};
