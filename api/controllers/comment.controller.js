import express from 'express';
import { errorHandler } from '../utils/errorHandler.js';
import Comment from '../model/comment.model.js';

export const createComment = async (req, res, next) => {
    
    try {
      const { content, postId, userId } = req.body;
        
      if (userId !== req.user.id) {
        return next(
          errorHandler(403, 'You are not allowed to create this comment')
        );
      }
      
      const newComment = new Comment({
        content,
        postId,
        userId,
      });
      await newComment.save();
      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  };



  export const getComment = async (req, res, next) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
      
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };
  