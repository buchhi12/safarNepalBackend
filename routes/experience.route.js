import express from 'express'
import auth from '../middlewareauthentication.js'
import { getexperinece,addexperience } from '../controllers/Experience.controller.js'
const router=express.Router();
router.post("/",addexperience);
router.get("/",getexperinece);
export default router;