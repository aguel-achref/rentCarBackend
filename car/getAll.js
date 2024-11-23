import { db } from '../app.js';

// Function to delete a user
export async function getAllCars(req, res) {

  try {
   //get All users
    const [cars] = await db.promise().query('SELECT * FROM cars');
    if (cars.length === 0) {
      return res.status(404).json({ message: 'cars not found' });
    }
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'cars returned successfully',
      data: cars,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error returned cars:', error);
    res.status(500).json({ message: 'Error returned cars' });
  }
}
