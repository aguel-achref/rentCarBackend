import { db } from '../app.js';

// Function to delete a user
export async function deleteUser(req, res) {

  try {
    // Delete the user
    const [deletedUser] = await db.promise().query('DELETE FROM users WHERE id = ?', [req.params.id]);

    if (deletedUser.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    //get user deleted
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [req.params.id]);
   
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}
