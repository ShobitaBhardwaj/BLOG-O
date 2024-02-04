//route is an endpoint of an api
//This file is specifaclly for routes
import express from 'express';

import { signupUser,loginUser } from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import { createPost , getAllPosts , getPost , updatePost , deletePost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js'
import { newComment , getComments , deleteComment } from '../controller/comment-controller.js';

const router =express.Router();

//signup is an api endpoint
router.post('/signup',signupUser);
router.post('/login',loginUser);

//we need to pass middleware in this
//second argument is the middleware
//middleware is used when you want to perform an action before an api implementation

router.post('/file/upload',upload.single('file') , uploadImage);
router.get('/file/:filename' , getImage);

router.post('/create' ,authenticateToken ,  createPost);
router.get('/posts',authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put( '/update/:id', authenticateToken,updatePost );
router.delete('/delete/:id',authenticateToken , deletePost);

router.post('/comment/new', authenticateToken,newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken,deleteComment);

export default router;