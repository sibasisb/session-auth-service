const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {validPassword} = require('../utils/passport-utils');
const User = require('../models/userModel');

const verifyCallback = (username, password, done) => {
    if (!username || username.length < 1) {
        done(null, false);
    }
    if (!password || password.length < 1) {
        done(null, false);
    }
    User.findOne({username}) 
    .then(user => {
        if (!user) {
            return done(null, false);
        }
        if (validPassword(password, user.hash, user.salt)) {
            return done(null, user);
        }
        done(null, false);
    })
    .catch(err=> {
        done(err);
    })
};

const localStrategy = new LocalStrategy(verifyCallback);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err);
    })
});
