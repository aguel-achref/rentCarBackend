import { db } from '../app.js';

// Function to delete a user
export async function getOneUser(req, res) {

  try {
    const id = req.params.id;
   //get one user
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
   
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User returned successfully',
      data: user,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error returned user:', error);
    res.status(500).json({ message: 'Error returned user' });
  }
}
