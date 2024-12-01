import express from 'express'; 
import { createCar } from '../car/create.js';
import { deleteCar } from '../car/delete.js';
import { updateCar } from '../car/update.js';
import { getOneCar } from '../car/getOne.js';
import { getAllCars } from '../car/getAll.js';
import { getAllDispoCars } from '../car/getAllDispoCars.js';
import { reserverCar } from '../reservation/reserverCar.js';
import { authenticateToken } from '../utils/middlewares/auth.js';
import { searchCar } from '../search/searchCar.js';
import { getAllByAdmin } from '../car/getAllByAdmin.js';
const router = express.Router(); 

// Define the routes
router.post('/createCar', authenticateToken, createCar); 
router.put('/updateCar/:id', authenticateToken, updateCar); 
router.delete('/deleteCar/:id', authenticateToken, deleteCar);
router.get('/getOneCar/:id', getOneCar);
router.get('/getAllCars', getAllCars);
router.get('/getAllDispoCars', getAllDispoCars);
router.post('/reserver/:id', authenticateToken, reserverCar);
router.post('/searchCar', searchCar);
router.get('/getAllByAdmin', authenticateToken, getAllByAdmin);



export default router; 
