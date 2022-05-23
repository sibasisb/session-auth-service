const router = require('express').Router();
const passport = require('passport');
const userAuthController = require('../controllers/userAuthController.js')
const { registrationController, logoutController} = userAuthController;
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success'}), (req, res, next) => {});

router.post('/register', registrationController);

router.post('/logout', logoutController);

router.get('/login-success', (req, res, next) => {
    res.status(200).json({user: req.user});
});

router.get('/login-failure', (req, res, next) => {
    res.status(401).json({message: "Login failed"});
});

module.exports = router;
