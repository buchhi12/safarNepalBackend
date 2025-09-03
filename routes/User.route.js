import express from 'express';
import auth from '../middlewareauthentication.js'
import User from '../models/users.model.js'
const router=express.Router();
import {signup,login} from '../controllers/User.Controller.js'
router.post('/signup',signup);
router.post('/login',login);
export default router;

