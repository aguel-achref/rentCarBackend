import { verifyToken } from '../utils.js';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing or invalid' });
    }

    try {
        const user = verifyToken(token);
        req.user = user; // Attach user information to the request
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}
