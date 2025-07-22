import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const verifyToken=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token) return res.status(401).json({message:'Token Not provided'})
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded) return res.status(401).json({message:'Invalid Token'})
        req.userId=decoded.userId;
    next();
    } catch (error) {
        return res.status(401).json({message:'Verify Token Failed'})
    }
}