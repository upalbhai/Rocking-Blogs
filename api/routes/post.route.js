import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, getPosts } from '../controllers/post.controller.js';
const router = express.Router();
router.post('/createpost',verifyToken,createPost)
router.get('/getpost',getPosts)


export default router;