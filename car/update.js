import { db } from '../app.js';

// Function to delete a user
export async function updateCar(req, res) {

  try {
    const { name , agency_name, disponibility, price_per_day, description, localisation, color, seats, gearbox, brand, price_under_two_month, price_more_two_month, price_more_six_month  } = req.body;
    const id = req.params.id;
    //edit car
    const [UpdateCar] = await db.promise().query('UPDATE cars SET name = ?, agency_name = ?, disponibility = ?, price_per_day = ?, description = ?, localisation = ?, color = ?, seats = ?, gearbox = ?, brand = ?, price_under_two_month = ?, price_more_two_month = ?, price_more_six_month = ? WHERE id = ?', [name, agency_name, disponibility, price_per_day, description, localisation, color, seats, gearbox, brand, price_under_two_month, price_more_two_month, price_more_six_month, id]);
   
    if (UpdateCar.affectedRows === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
   
    //get car updated
    const [car] = await db.promise().query('SELECT * FROM cars WHERE id = ?', [id]);
    
   
    // Return success response
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'car updated successfully',
      data: car,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Error updating car' });
  }
}
