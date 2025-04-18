import mongoose from 'mongoose';
import moongoose from 'mongoose';

export const connectDB = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGODB_URI);
       console.log(`MONGODB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(`MongoDB errror:`, error)

    }
}