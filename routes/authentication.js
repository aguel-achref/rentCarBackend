import express from 'express'; 
import { createUser } from '../authentication/createUser.js'; 
import { getAllUsers } from '../authentication/getAllUsers.js';
import { editUser } from '../authentication/editUser.js';
import { deleteUser } from '../authentication/deleteUser.js';
import { getOneUser } from '../authentication/getOneUser.js';
import { login } from '../authentication/login.js'; 
import { authenticateToken } from '../utils/middlewares/auth.js';
const router = express.Router(); 

// Define the routes
router.post('/createUser', createUser); 
router.get('/getAllUsers', getAllUsers); 
router.get('/getOneUser/:id', getOneUser);
router.put('/editUser/:id', editUser); 
router.delete('/deleteUser/:id', deleteUser);
router.post('/login', login);


export default router; 
