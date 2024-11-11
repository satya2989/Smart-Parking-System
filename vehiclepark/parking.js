var checkk="";
document.getElementById("e").addEventListener('click',function (event){
          event.preventDefault();
          const data={
            "Name":document.getElementById("name").value,
            "Mobile":document.getElementById("mobile").value,
            "Vehicle_No":document.getElementById("vehicle").value,
            "Wheeler":document.getElementById("whels").value,
            "BTime":document.getElementById("time").value,
            "OTP":document.getElementById("otp").value
          };
      
        if(data["OTP"]=="")
         console.log("The data is",data);
          fetch("http:localhost:2000/check",{
              method:'POST',
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(data),
          }).then((res)=>{//console.log("The respponse is submitted succesfully",);
            return res.json();
          }).then((result)=>{
            if(result.error){
              console.log(result.error);
              alert(result.error);
              document.getElementById("f").reset();
            }
              else{
               console.log("Your OTP for Validation: ",result.OTP);
               let y=result.OTP;
               checkk+=y;
               alert(`Your OTP for Validation: ${y}`);
               document.getElementById("ad").style.visibility="hidden";
               document.getElementById("otpSection").style.visibility="visible";
              }
          }).catch((err)=>{
            console.log("The error is ",err);
          })
})
document.getElementById("verify").addEventListener('click',function()
{
   //event.preventDefault();
   
   const data={
    "Name":document.getElementById("name").value,
    "Mobile":document.getElementById("mobile").value,
    "Vehicle_No":document.getElementById("vehicle").value,
    "Wheeler":document.getElementById("whels").value,
    "BTime":document.getElementById("time").value,
  };

  let ans=document.getElementById("otp").value;
  console.log("oootp value",checkk,ans);
  if(checkk===document.getElementById("otp").value){

    fetch("http:localhost:2000/submit",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data),
  }).then((res)=>{
    return res.json();
  }).then((result)=>{
    alert("The data is entered successfully");
  }).catch((err)=>{

    console.log("The error is", err);
  })
    
  }
    
  else 
     alert("wRONG OTP");

     document.getElementById("ad").style.visibility="visible";

  document.getElementById("otpSection").style.visibility="hidden";
  document.getElementById("f").reset();
  checkk="";
})


