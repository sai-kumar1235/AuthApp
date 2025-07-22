import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js';
export const signup =async (req,res)=>{
    const {email,password,name}=req.body;
    try {
        
        if(!email || !password || !name){
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword=await bcrypt.hash(password,8);
        const verificationToken=Math.floor(100000+Math.random()*900000).toString();
        const verificationTokenExpiresAt=Date.now()+10*60*1000;
        const user =new User({
            email,
            password:hashedPassword,
            name,
            verificationToken:verificationToken,
            verificationTokenExpiresAt:verificationTokenExpiresAt
        })
        await user.save();
        //jwt
        generateTokenAndSetCookie(res,user._id)
        res.status(201).json({succes:true,message:'User createdsuccessfully',user:{
            ...user._doc,
            password:undefined
        }})

    } catch (error) {
        console.log("Signup Error:",error.message);
        process.exit(1)
    }
}

export const login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({message:'Invalid Password entered'});
        }
        //jwt
        generateTokenAndSetCookie(res,user._id)
        user.lastLogin=Date.now();
        await user.save()
        res.status(200).json({message:'Login Success',user:{
            ...user._doc,
            password:undefined
        }})
    } catch (error) {
        console.log("Login Error:",error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout =async (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message:"Logout Success"})
    } catch (error) {
        console.log("Logout Error:",error.message);
        res.status(500).json({ message: 'Logout failed' });
    }
}

export const checkAuth=async (req,res)=>{
    try {
        const user=await User.findById(req.userId).select('-password');
        if(!user) return res.status(401).json({message:'User not found'});
        res.status(200).json({success:true,message:'User Found',user})
    } catch (error) {
        console.log("Check Auth Error:",error.message);
        res.status(500).json({ message: 'Check auth failed' });
    }
}