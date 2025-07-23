const mongoose =  require('mongoose')


const connectDb =  async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb is connected");
    }
    catch(error){
        console.error("Mongoose connection  error : " ,  error.message)
        process.exit();
    }
};
module.exports = connectDb;