require('dotenv').config();

if (process.env.NODE_ENV === 'DEVELOPMENT') {
    module.exports = console;
}

// Your production logger goes in here
module.exports = console;
