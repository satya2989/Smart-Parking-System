const express=require("express")
const asyncHandler=require("express-async-handler")
const ownpage=require("./schema")
const otpGenerator = require('otp-generator');
const getcontact= asyncHandler(async (req,res)=>
    {
        
        const {Mobile,Vehicle_No,BTime} = req.body;

    try {
        console.log(`the vehhicle_no is ${Vehicle_No}`)
        const vehicle = await ownpage.findOne({ Vehicle_No: Vehicle_No });

        if (vehicle) {
            res.status(200).json(vehicle); 
        } else {
            console.error("Vehicle not found, register the vehicle");
            res.status(404).json({ error: "Vehicle not found, please register the vehicle." });
        }
    } catch (error) {
        console.error("Error occurred while searching for the vehicle:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }

    })
const get2=asyncHandler (async (req,res)=>{

    console.log(req.body);
       
    const {Name,Mobile,Vehicle_No,Wheeler,BTime}=req.body;

    if(!Name || !Vehicle_No ||!Mobile || !Wheeler || !BTime)
        {
            console.log("There was error")
            throw new error("Problem in creating contact")
        }
   if (Name) {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(Name)) {
        return res.status(400).json({ error: 'Name should only contain letters and spaces.' });
        
    }
    }
    if (Mobile) {
        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(Mobile)) {
            return res.status(400).json({ error: 'Mobile number must be exactly 10 digits.' });
        }
    }
    if (Vehicle_No) {
        const vehiclePattern = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;
        if (!vehiclePattern.test(Vehicle_No)) {
            return res.status(400).json({ error: 'Vehicle number should follow the format: XX00XX0000 (e.g., MH12AB1234).' });
        }
    }
    if (Wheeler) {
        if (Wheeler < 1 || Wheeler > 10) {
            return res.status(400).json({ error: 'Wheeler must be a number between 1 and 10.' });
        }
    }
            
  
      
       
   // console.log("The time is",BTime);

    try{
       let user = await ownpage.findOne({ Mobile});
       if (user) {
          // alert("Name is not Unique");
          
           return res.status(400).json({error:"NOT UNIQUE"});
        }

           
            const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
     
                // For demo purposes, log the OTP to console (do not do this in production)
              console.log('Generated OTP:', otp);
            
          
     
               return  res.status(200).json({OTP:otp});
            
           
       }
       //console.log(req.body.OTP);
      
    
      
      catch(err)
      {
         console.log("There was an error in generating otp");
         throw new Error(err);
      }
})
const createcontact=asyncHandler(async(req,res)=>
    {
        const {Name,Mobile,Vehicle_No,Wheeler,BTime}=req.body;
        const Amount_paid="";
        try{
            const check= await ownpage.create({Name,Mobile,Vehicle_No,Wheeler,BTime,Amount_paid});
                   console.log("Created", req.body);
                  return res.status(200).json(req.body);
           }
         catch(err)
         {
            console.error(error);
            res.status(500).json({ message: 'Error creating vehicle record', error });
         }
    })

const calfare=asyncHandler(async(req,res)=>{

    const {Mobile,Amount_paid}=req.body;

    let user = await ownpage.findOne({ Mobile});
    if(user){
           user.Amount_paid=Amount_paid;
           await user.save();
               console.log("Amount inserted", user.Amount_paid);
              return res.status(200).json(req.body);
       }
     else
     {
        console.error(error);
        throw new Error("Amount is not inserted")
     }


})
const farereader=asyncHandler(async(req,res)=>{
     const {Mobile}=req.body;
     let user = await ownpage.findOne({ Mobile});
      if(user){
              console.log("Amount inserted ", user.Amount_paid);
  
                return res.status(200).json({amount: `${user.Amount_paid}`});
         }
       else
       {
          return res.status(400).json({ error: 'Mobile not found' });
       }

})
const finalpayment=asyncHandler(async(req,res)=>{
    const {Mobile}=req.body;
    let user = await ownpage.findOne({ Mobile});
    
    if(user){
            console.log("Amount inserted", user.Amount_paid);

              return res.status(200).json({amount: `${user.Amount_paid}`});
       }
     else
     {
        return res.status(400).json({ error: 'Mobile not found' });
     }

})


module.exports={getcontact,createcontact,get2,calfare,finalpayment,farereader}