import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../db.js";
import zod from "zod";

const user=express.Router();

const body=zod.object({
    name:zod.string().min(1),
    email:zod.string().email(),
    password:zod.string().min(8)
})

user.post('/signup',async(req,res)=>{
    const {success}=body.safeParse(req.body);
   if(!success){
    return res.status(400).json({message:"Invalid inputs"});
   }
   const user=await User.create({name,email,password});
   const token=jwt.sign({userId:user._id},JWT_SECRET);
   res.status(201).json({message:"User created successfully",token}); 
})

user.post('/login',async(req,res)=>{
    const {success}=body.safeParse(req.body);
    if(!success){
        return res.status(400).json({message:"Invalid inputs"});
    }
    const user=await User.findOne({email});
   if(user){
    const token=jwt.sign({userId:user._id},JWT_SECRET);
    res.status(200).json({message:"User logged in successfully",token});
   }
   else{
    res.status(400).json({message:"User not found"});
   }
})

export default user;;
