import { db } from '../app.js';

// Function to delete a user
export async function deleteCar(req, res) {

  try {
    // Delete the user
    const [deletedCar] = await db.promise().query('DELETE FROM cars WHERE id = ?', [req.params.id]);

    if (deletedCar.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    //get user deleted
    const [car] = await db.promise().query('SELECT * FROM cars WHERE id = ?', [req.params.id]);

   
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'car deleted successfully',
      data: car,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Error deleting car' });
  }
}
