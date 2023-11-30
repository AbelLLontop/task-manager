import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.vjznrpq.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`;
        await mongoose.connect(uri)
        console.log(">>> DB is connected");

    }catch(error){
        console.log(error);
    }

}