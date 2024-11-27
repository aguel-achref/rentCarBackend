import { db } from '../app.js';
import { v4 as uuidv4 } from 'uuid';

// Function to create a user
export async function createCar(req, res) {
  const { name, agency_name, disponibility, price, caution, description, localisation } = req.body;
  const id = uuidv4();

  try {
    // Validate required fields
    if (!name || !agency_name ||!caution || disponibility === undefined || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, agency name, disponibility, caution and price are required.' 
      });
    }

    // Convert disponibility to a proper integer (0 or 1)
    const valuesDisponibility = disponibility ? 1 : 0;

    // Insert data into the database
    const [result] = await db.promise().query(
      'INSERT INTO cars (id, name, agency_name, disponibility, price, caution, description, localisation) VALUES (? ,?, ?, ?, ?, ?, ?, ?)', 
      [id, name, agency_name, valuesDisponibility, price, caution, description, localisation]
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
