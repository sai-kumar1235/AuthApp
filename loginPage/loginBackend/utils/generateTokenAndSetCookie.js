import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie= async (res,id)=>{
    const token =jwt.sign({userId:id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000
    })
    return token;
}