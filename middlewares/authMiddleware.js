const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        const error = new Error();
        error.status = 401;
        error.message = "Not authenticated";
        return next(error);
    }
    next();
};

module.exports = {
    isLoggedIn
};
