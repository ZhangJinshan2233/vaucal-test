module.exports = (req, res, next) => {
    if (!req.user.isAdmin) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return next();
}