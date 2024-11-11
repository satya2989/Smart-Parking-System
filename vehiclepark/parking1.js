
document.getElementById("f").addEventListener('click',function (event){
    event.preventDefault();
    var startDateTime = document.getElementById('datetime').value;
    console.log(startDateTime);
    const data={
      
      "Mobile":document.getElementById("mobile").value,
      "Vehicle_No":document.getElementById("vehicle").value,
     
      "BTime":document.getElementById("datetime").value
      
    };
  //   data["Name"]=document.getElementById('name').value;
  //   data["Vehicle_No"]=document.getElementById('vehicle').value;
  //   data["wheeler"]= document.getElementById('whels').value;
  //   data["Booking_Time"]= document.getElementById('time').value;
 


    fetch("http:localhost:2000/find",{
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
      
         
           
        // document.getElementById("ot").innerHTML='OTP : <input type="Text" id="otp" required>   <div><button type="button" id="verify">Verify</button></div> 'z
       
        else{
          const endDateTime = result.BTime;
          console.log(`THE START ${startDateTime} THE END ${endDateTime}`)
          // Convert the datetime-local input values to Date objects
          const endDate = new Date(startDateTime);
          const startDate = new Date(endDateTime);
      
          // Calculate the difference in milliseconds
          const diffInMs = endDate - startDate;
      
          // Convert the difference to hours
          const diffInHours = diffInMs / (1000 * 60 * 60);
      
          // Display the difference
          alert(`Difference: ${diffInHours.toFixed(2)} hours and RS per hr- ${7}`);

        document.getElementById("f").style.visibility="hidden"
        let val=diffInHours.toFixed(2)
        document.getElementById("otp").value=Math.floor(val*7);
         document.getElementById("fare").style.visibility="visible"
          // Example: Do something with the calculated hours
          console.log(`The difference between the two dates is ${diffInHours.toFixed(2)} hours.`);
        
        //  document.getElementById("ad").style.visibility="hidden";
        //  document.getElementById("otpSection").style.visibility="visible";
        }
        
        //document.getElementById("otp").value=result.OTP;
        // document.getElementById('otpSection').classList.remove('hidden');
        // function sleep(ms) {
        //   return new Promise(resolve => setTimeout(resolve, 2000));
        // }
        //  let ans=result.OTP;
        //  if(ans==document.getElementById("otp").value){
        //   alert("The verification is done successfully and data is entered");

        
         //}

         
       
         
         

         //document.getElementById("expenseForm").reset();
    }).catch((err)=>{
      console.log("The error is ",err);
    })
})

document.getElementById("pay").addEventListener('click',function (event){
  event.preventDefault();
   const data={"Mobile":document.getElementById("mobile").value,"Amount_paid": document.getElementById("otp").value};

  fetch("http:localhost:2000/fare",{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data),
}).then((res)=>{//console.log("The respponse is submitted succesfully",);
  return res.json();
}).then((result)=>{
   console.log(result);
    window.location.href ='payment.html';
})

})