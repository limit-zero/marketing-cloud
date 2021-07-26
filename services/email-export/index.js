const mongodb = require('./mongodb');
const syncAssets = require('./sync-assets');

process.on('unhandledRejection', (e) => { throw e; });

const { log } = console;

(async () => {
  log('Connecting to MongoDB...');
  await mongodb.connect();

  const collection = await mongodb.collection({ dbName: 'lead-management-indm', name: 'exact-target-email-export' });

  await syncAssets({ collection });

  await mongodb.close();
  log('DONE!');
})().catch((e) => setImmediate(() => { throw e; }));
