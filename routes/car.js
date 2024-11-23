import express from 'express'; 
import { createCar } from '../car/create.js';
import { deleteCar } from '../car/delete.js';
import { updateCar } from '../car/update.js';
const router = express.Router(); 

// Define the routes
router.post('/createCar', createCar); 
router.put('/updateCar/:id', updateCar); 
router.delete('/deleteCar/:id', deleteCar);



export default router; 
