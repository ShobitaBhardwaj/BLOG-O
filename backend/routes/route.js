//route is an endpoint of an api
//This file is specifaclly for routes
import express from 'express';

import { signupUser } from '../controller/user-controller.js';

const router =express.Router();

//signup is an api endpoint
router.post('/signup',signupUser);

export default router;