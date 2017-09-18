var isAuthenticated = function (req, res, next) {
    if (!req.session.user) {
        res.status(401).send();
    } else {
        next();
    }
}
module.exports = isAuthenticated;