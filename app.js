const express = require('express');
const passport = require('passport');
require('dotenv').config();
const logger = require('./loggers');
const app = express();
const PORT = process.env.PORT || 8000;

const router = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const dbConfig = require('./config/databaseConfig');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const errorHandler = require('./controllers/errorHandler');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const sessionStore = MongoStore.create({
    clientPromise: dbConfig.clientPromise,
    dbName: process.env.SESSION_DB_NAME,
    collectionName: process.env.SESSION_COLLECTION_NAME
});

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 48
    }
}));

/**
 * Passport config comes here before routes are set up and after session is set up
 */

require('./config/passportConfig');

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(protectedRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    logger.debug(`Service running on PORT: ${PORT}`);
});
