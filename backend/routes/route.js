//route is an endpoint of an api
//This file is specifaclly for routes
import express from 'express';

import { signupUser,loginUser } from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import { createPost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js'


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

export default router;