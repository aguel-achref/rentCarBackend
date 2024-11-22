import { db } from '../app.js';

// Function to delete a user
export async function getAllUsers(req, res) {

  try {
   //get All users
    const [users] = await db.promise().query('SELECT * FROM users');
    if (users.length === 0) {
      return res.status(404).json({ message: 'Users not found' });
    }
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User returned successfully',
      data: users,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error returned user:', error);
    res.status(500).json({ message: 'Error returned user' });
  }
}
