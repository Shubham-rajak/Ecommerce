import express from 'express';
import { addUser, adminLogin, deleteUser, getUserById, getUsers, login, signUp, updateUser } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middlewere';

const router = express.Router();
router.post('/add-user',auth,addUser);
router.get('/get-users', auth, getUsers)
router.get('/get-user', auth, getUserById);
router.put('/update-user/:user_id',updateUser)
router.delete('/delete-user/:user_id',deleteUser);


// Auth routers

router.post('/sign-up',signUp);
router.post('/login',login);
router.post('/admin-login',adminLogin);



export default router;