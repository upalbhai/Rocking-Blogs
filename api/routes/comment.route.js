import express from 'express';
import { createComment, editComment, getComment, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create',verifyToken,createComment)
router.get('/getcomment/:postId',verifyToken,getComment)

router.put('/likecomment/:commentId',verifyToken,likeComment)

router.put('/editcomment/:commentId',verifyToken,editComment)

export default router;