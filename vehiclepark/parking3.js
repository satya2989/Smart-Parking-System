
document.getElementById("pay").addEventListener('click',function (event){
    event.preventDefault();
     const data={"Mobile": document.getElementById("mobile").value};
  
    fetch("http:localhost:2000/fale",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data),
  }).then((res)=>{//console.log("The respponse is submitted succesfully",);
    return res.json();
  }).then((result)=>{
      if(result.error)
    {
        alert("Mobile is not found");
        document.getElementById("payment-form").reset();
        
    }
    else{
        console.log("77777",result);
        document.getElementById("feature").style.visibility="visible";
       // document.getElementById("amount").style.visibility =visible;
       

        document.getElementById("amount").value=result.amount;
        document.getElementById("pay").style.visibility= "hidden";
      
      document.getElementById("fix").style.visibility="visible";
      //alert("The payment is successfully completed");
      //document.getElementById("payment-form").reset();
      //window.location.href ='vehi.html';
    }
  })
  
  })
  
document.getElementById("fix").addEventListener('click',function (event){
    event.preventDefault();
     alert("The payment is successfully completed");
      document.getElementById("payment-form").reset();
      window.location.href ='vehi.html';

})