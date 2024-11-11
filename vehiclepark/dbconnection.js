const mongoose=require("mongoose");

const dbconnect=async()=>{
    try{

       const co=await mongoose.connect('mongodb+srv://satya2989:satya2989@satya2989.zkenndy.mongodb.net/?retryWrites=true&w=majority&appName=Satya2989');
       console.log("The database is connected successfully  ",co.connection.host,co.connection.name );
    }
    catch(err)
    {
        console.log(err);
        throw new Error("There is error in connecting");


    }
}
module.exports=dbconnect;



