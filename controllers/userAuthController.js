const User = require('../models/userModel');
const logger = require('../loggers');
const { genPassword } = require('../utils/passport-utils');

const registrationController = (req, res, next) => {
    const {username, password} = req.body;
    const error = new Error();
    if (!username || !password) {
        error.status = 400;
        error.message = "Bad input data";
        return next(error);
    }
    const {hash, salt} = genPassword(password);
    const user = new User({
        username,
        hash,
        salt
    });
    user.save()
    .then((user)=> {
        res.status(200).json({user: user, message: 'Object saved'});
    })
    .catch(err => {
        logger.debug(err)
        error.status = 400;
        error.message = "Operation failed";
        return next(error);
    });
};

const logoutController = (req, res, next) => {
    const error = new Error();
    error.status = 401;
    error.message = "Logging out failed";
    if (req.logout === undefined) {
        return next(error);
    }
    
    req.logout((err) => {
        if (err) {
            return next(error);
        }
        res.status(200).json({message: "Logged out successfully"});
    });
};

module.exports = {
    registrationController,
    logoutController
};
