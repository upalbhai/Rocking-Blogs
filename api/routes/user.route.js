import express from 'express';
import { test, updateuser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test',test);
router.put('/update/:userId',verifyToken,updateuser)
export default router;