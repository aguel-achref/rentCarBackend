import { db } from '../app.js';

// Function to delete a user
export async function editUser(req, res) {

  try {
    const { first_name, last_name, email } = req.body;
    const id = req.params.id;
    //edit user
    const [editedUser] = await db.promise().query('UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?', [first_name, last_name,email,id]);
   
    if (editedUser.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    //get user deleted
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
   
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
}
