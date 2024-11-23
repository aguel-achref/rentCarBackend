import { db } from '../app.js';

// Function to delete a user
export async function getOneCar(req, res) {

    const id = req.params.id;
  try {

   //get All users
    const [car] = await db.promise().query('SELECT * FROM cars where id = ?', [id]);
    if (car.length === 0) {
      return res.status(404).json({ message: 'car not found' });
    }
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'car returned successfully',
      data: car,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error returned car:', error);
    res.status(500).json({ message: 'Error returned car' });
  }
}
