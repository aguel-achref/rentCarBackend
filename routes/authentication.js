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
router.post('/createUser', authenticateToken, createUser); 
router.get('/getAllUsers', authenticateToken, getAllUsers); 
router.get('/getOneUser/:id', authenticateToken, getOneUser);
router.put('/editUser/:id', authenticateToken, editUser); 
router.delete('/deleteUser/:id', authenticateToken, deleteUser);
router.post('/login', login);


export default router; 
