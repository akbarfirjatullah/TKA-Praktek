const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(403).json({ message: 'Token tidak tersedia' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid atau kadaluarsa' });
    }
};

module.exports = { verifyToken };