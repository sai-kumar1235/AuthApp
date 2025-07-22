import express from 'express';
import { db } from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'
const app=express();
const PORT =process.env.PORT || 5000;
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello")
})


app.use('/api/auth',authRoutes);
const startServer = async () => {
    try {
        await db(); // Wait for database connection
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();