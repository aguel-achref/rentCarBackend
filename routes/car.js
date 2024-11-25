import express from 'express'; 
import { createCar } from '../car/create.js';
import { deleteCar } from '../car/delete.js';
import { updateCar } from '../car/update.js';
import { getOneCar } from '../car/getOne.js';
import { getAllCars } from '../car/getAll.js';
import { getAllDispoCars } from '../car/getAllDispoCars.js';
import { reserverCar } from '../reservation/reserverCar.js';
import { authenticateToken } from '../utils/middlewares/auth.js';
const router = express.Router(); 

// Define the routes
router.post('/createCar', createCar); 
router.put('/updateCar/:id', updateCar); 
router.delete('/deleteCar/:id', deleteCar);
router.get('/getOneCar/:id', getOneCar);
router.get('/getAllCars', getAllCars);
router.get('/getAllDispoCars', getAllDispoCars);
router.post('/reserver/:id',authenticateToken, reserverCar);



export default router; 
