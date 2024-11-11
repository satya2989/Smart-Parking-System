const express=require("express")
const app=express()
const cors=require("cors")
const bodyparse=require("body-parser")
const mongoose=require("mongoose")
const connectdb=require("./dbconnection")



connectdb();


app.use(bodyparse.json());
app.use(cors());
app.use("/",require("./handling_routes"))
app.listen(2000,()=>
{
    console.log("The server is listening at 2000");
})

