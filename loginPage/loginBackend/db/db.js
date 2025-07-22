import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const db=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Connected",connect.connection.host);
        
    } catch (error) {
        console.log("Db Connection failed"+error.message);
        process.exit(1)
    }
} 

