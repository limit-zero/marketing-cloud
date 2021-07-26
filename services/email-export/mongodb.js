const MongoDBClient = require('@parameter1/mongodb/client');

const { EMAIL_EXPORT_MONGO_DSN } = process.env;

module.exports = new MongoDBClient({ url: EMAIL_EXPORT_MONGO_DSN });
