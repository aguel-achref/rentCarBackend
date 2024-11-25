import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';
const TOKEN_EXPIRY = '12h';

// Function to generate a JWT token
export function generateToken(userId) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
}
