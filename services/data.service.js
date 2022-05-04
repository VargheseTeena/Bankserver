//import jwt library
const jwt=require('jsonwebtoken')
database={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Laisha",password:1001,balance:3000,transaction:[]},
    1002:{acno:1002,uname:"Vyom",password:1002,balance:4000,transaction:[]}
  }
 const register=(uname,acno,password)=>
  {
   
    if(acno in database)
    {
//already exist
return {
  statusCode:401,
  status:false,
  message:"Account number already exist"
}
    }
    else{
      //add details into db
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      console.log(database);
      return {
        statusCode:200,
        status:true,
        message :"Successfully registered ...Please login"
      }
    }
  }

  const login=(acno,pswd)=>
  {
   if(acno in database)
   {
     if(pswd==database[acno]["password"]){
//already existing db 
currentUser=database[acno]["uname"]
currentAcno=acno
//token generate
const token=jwt.sign({
  currentAcno: acno
},'supersecret123456789')
return {
  statusCode:200,
  status:true,
  message:"login successfully",
  token:token,
  currentAcno,
  currentUser
  

}
     }
     else{
    
       return {
        statusCode:401,
        status:false,
        message :"Invalid password"
       }
     }

   }
   else{
     
     return {
      statusCode:422,
      status:false,
      message :"User doesnt exist"
     }
   }
  }
  
  // deposit
  const deposit=(acno,pswd,amt)=>
  {
   
    var amount=parseInt(amt)
    if(acno in database)
    {
if(pswd==database[acno]["password"]){
 
database[acno]["balance"]+=amount
database[acno]["transaction"].push({
  type:"Credit",
  amount:amount
})

return{
  statusCode:200,
  status:true,
  message: amount+" successfully credited...And new balance is: "+ database[acno]["balance"]
} 
}
else{
  return{
    statusCode:401,
    status:false,
    message :"Invalid password"
  }
}
    }
    else{
     
      return {
        statusCode:422,
        status:false,
        message :"User doesnt exist"
      }
    }
  }
  // withdraw
  const withdraw=(req,acno,pswd,amt)=>
  {
    
    var amount=parseInt(amt)
    if(acno in database)
    {
if(pswd==database[acno]["password"]){
  if(req.currentAcno!=acno){
    return{
      statusCode:422,
      status:false,
      message:"operation denied"
  
    }
  }
  if(database[acno]["balance"]>amount)
  {
    database[acno]["balance"]-=amount
    database[acno]["transaction"].push({
      type:"Debit",
      amount:amount
    })
  

    return {
      statusCode:200,
  status:true,
  message: amount+" successfully debited...And new balance is: "+ database[acno]["balance"]
    }
    
  }
  else{
    
    return {
      statusCode:401,
      status:false,
      message :"insufficient balance"
    }
  }

}
else{
 
  return{
    statusCode:402,
    status:false,
    message :"Invalid password"
  }
}
    }
    else{
    
      return {
        statusCode:422,
        status:false,
        message :"User doesnt exist"
      }
    }
  }
//transaction
 const  transaction=(acno)=>
  {
    if(acno in database){
  return {
    statusCode:200,
    status:true,
    transaction:database[acno].transaction
  }
}
else{
  return{ statusCode:422,
    status:false,
    message :"User doesnt exist"}
}

  }

    //export
    module.exports={
      register,
      login,
      deposit,
      withdraw,
      transaction
   
  }
