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

  
  export const likeComment = async(req,res,next)=>{
    try {
       const comment = await Comment.findById(req.params.commentId);
       if(!comment){
        return next(errorHandler(404,'Comment Not Found'))
       } 
       const userindex = comment.likes.indexOf(req.user.id);
       if(userindex===-1){
        comment.numberOfLikes +=1;
        comment.likes.push(req.user.id)
       }
       else{
        comment.numberOfLikes -=1;
        comment.likes.splice(userindex,1)
       }
       await comment.save();
       res.status(201).json(comment);
    } catch (error) {
        next(error)
    }
  }

  export const editComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      
      if (!comment) {
        return next(errorHandler(404, 'Comment Not Found'));
      }
  
      if (comment.userId.toString() !== req.user.id && !req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to edit this comment'));
      }
  
      if (!req.body.content || req.body.content.trim() === "") {
        return next(errorHandler(400, 'Content is required'));
      }
  
      const editedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { content: req.body.content },
        { new: true }
      );
  
      res.status(200).json(editedComment);
    } catch (error) {
      next(error);
    }
  };