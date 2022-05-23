require('dotenv').config();
const logger = require('../loggers');
const mongoose = require('mongoose');

let uri = process.env.URI;
const dbPassword = process.env.dbPassword;
uri = uri.replace('<password>', encodeURIComponent(dbPassword));
const mongodbOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const clientPromise = mongoose.connect(uri, mongodbOptions)
.then(m => {
    logger.debug('Connected to mongo db');
    return m.connection.getClient();
})
.catch(err => logger.debug(err));

module.exports = {
    clientPromise
};
