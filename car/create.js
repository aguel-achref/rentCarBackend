import { db } from '../app.js';
import { v4 as uuidv4 } from 'uuid';

// Function to create a user
export async function createCar(req, res) {
  const { name, agency_name, disponibility, price_per_day, caution, description, localisation, color, seats, gearbox, brand, price_under_two_month, price_more_two_month, price_more_six_month } = req.body;
  const id = uuidv4();
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Validate required fields
    if (!name || !agency_name ||!caution || disponibility === undefined || !price_per_day || !localisation || !color || !seats || !gearbox || !brand || !price_under_two_month || !price_more_two_month || !price_more_six_month) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, agency name, disponibility, caution and price are required.' 
      });
    }

    // Convert disponibility to a proper integer (0 or 1)
    const valuesDisponibility = disponibility ? 1 : 0;    

    // Insert data into the database
    const [result] = await db.promise().query(
      'INSERT INTO cars (id, user_id, name, agency_name, disponibility, price_per_day, caution, description, localisation, color, seats, gearbox, brand, price_under_two_month, price_more_two_month, price_more_six_month) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',   
      [id, userId, name, agency_name, valuesDisponibility, price_per_day, caution, description, localisation, color, seats, gearbox, brand, price_under_two_month, price_more_two_month, price_more_six_month]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while creating the car.' 
      });
    }
    const [car] = await db.promise().query('SELECT * FROM cars WHERE id = ?', [id]);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Car created successfully',
      data: car,
    });
  } catch (error) {
    // Catch and log any errors
    console.error('Error creating car:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while creating the car.' 
    });
  }
}
