import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        //to check if user already exist
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message:"Email already exists"})
            //hash password 
            const hashedPassword=await bcrypt.hash(password,10);
            const user=await User.create({name,email,password:hashedPassword,role});
            res.status(201).json({message:"User created",user});
    
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
 };
export const login=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        const user=await User.findOne({email});
        //checking if user exist
        if(!user) return res.status(400).json({message:"User not found"});
        //comparing password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});
        //create token
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET
,{expiresIn:"1h"});
       //send response
        res.json({message:"Login successful",token,role:user.role});

     }
     catch(err){
        res.status(500).json({message:err.message});
     }

 };