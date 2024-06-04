import express from 'express';
import { createComment, deleteComment, editComment, getComment, getcomments, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create',verifyToken,createComment)
router.get('/getcomment/:postId',verifyToken,getComment)

router.put('/likecomment/:commentId',verifyToken,likeComment)

router.put('/editcomment/:commentId',verifyToken,editComment)
router.delete('/deletecomment/:commentId',verifyToken,deleteComment)
router.get('/getcomment', verifyToken, getcomments);
export default router;