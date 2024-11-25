import bcrypt from 'bcrypt';
import {db} from '../app.js';
import { generateToken } from '../utils/utils.js';

// Function to login a user
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists by email
        const [result] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const user = result[0];        

        if (!user) {
            return res.status(404).json({ message: 'Email or password incorrect' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }        

        // Generate JWT token
        const token = generateToken(user.id);
        console.log("token",token);
        

        // Attach the token to the response
        res.status(200).json({
            success: true,
            status: 200,
            message: 'User logged in successfully',
            data: user,
            token,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
}
