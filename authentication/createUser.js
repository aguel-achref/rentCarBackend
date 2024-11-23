import { db } from '../app.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

// Function to create a user
export async function createUser(req, res) {
  const { first_name, last_name, email, password,status } = req.body;
  const id = uuidv4();

  try {
    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!first_name || !last_name) {
      return res.status(400).json({ message: 'First name and last name are required' });      
    }

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });      
    }
     // Validate email format
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       return res.status(400).json({ message: 'Invalid email format' });
     };

      // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long',
      });
    };

    // Check status value
    const validStatuses = ['ADMIN', 'CLIENT'];
    const userStatus = status && validStatuses.includes(status.toUpperCase()) ? status.toUpperCase() : 'CLIENT';

    // Check if email already exists
    const [existingUser] = await db.promise().query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    };
  
    const [rows] = await db.promise().query(
      `INSERT INTO users (id, first_name, last_name, email, password, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, first_name, last_name, email, hashedPassword, userStatus]
    );

    // Retrieve the user just created
    const [getUser] = await db.promise().query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    const user = getUser[0];

    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
