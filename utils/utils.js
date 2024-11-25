import jwt from 'jsonwebtoken';

const SECRET_KEY =" R3KqJ$8h#29k@xZ7H8b!pL2m#94Mv!cT";

const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '12h';


// Function to generate a JWT token
export function generateToken(userId) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
}

// Function to verify a JWT token
export function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}
