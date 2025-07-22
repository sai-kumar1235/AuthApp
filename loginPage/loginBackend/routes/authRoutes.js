import express from 'express';
import { login,signup,logout,checkAuth } from '../controllers/authController.js';
import {verifyToken} from '../middleware/verifyToken.js';
const router=express.Router();


router.get('/check-auth',verifyToken,checkAuth);
router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)


export default router;