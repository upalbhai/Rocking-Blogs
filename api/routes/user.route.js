import express from 'express';
import { deleteUser, test, updateuser,signout, getUsers, deleteUserByAdmin } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyToken,updateuser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.delete('/delete/admin/:userId',verifyToken,deleteUserByAdmin);
router.post('/signout', signout);
router.get('/getusers',verifyToken,getUsers)
export default router;