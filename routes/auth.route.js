import express from 'express'
import{signup,login,getUsers} from '../controllers/auth.controller.js'
import {auth} from '../middlewareauthentication.js'
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/",auth(),(req,res)=>{
    res.json({message:"protected route",user:req.user});
})
router.get("/users",auth,getUsers);
export default router;