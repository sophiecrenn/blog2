const adminMiddleware = async (req, res, next) => {

    if (!req.user.admin) {
        return res.status(403).json({ message: 'Admin access denied' });
    }

    next();
}

module.exports = adminMiddleware