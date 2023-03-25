const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('No token provided');
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).send('Invalid token');
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
};

module.exports = {
    authMiddleware,
};