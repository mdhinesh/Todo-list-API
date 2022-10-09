import mongoose from "mongoose";

const connectdb = async(req,res) => {
    const connection_string = process.env.DB_URL;
    try{
        await mongoose.connect(connection_string)
        console.log("Connected succefully")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectdb