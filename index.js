//server creation
//import express
const express = require('express')
//import dataservice
const dataservice=require('./services/data.service')
//create server app using express
const app = express()
//import json webtoken
const jwt=require('jsonwebtoken')
//resolve api call
app.get('/',(req,res)=>{
    res.send("GET REQUEST")
})
app.post('/',(req,res)=>{
    res.send("Post request")
})
app.put('/',(req,res)=>{
    res.send("Put request")
})
app.patch('/',(req,res)=>{
    res.send("Patch request")
})
app.delete('/',(req,res)=>{
    res.send("Delete request")
})
//set port number 
app.listen(3000, () => {
    console.log("server  started at 3000");
})
//to parse json
app.use(express.json())

//jwt middleware (router specific)
const jwtmiddleware=(req,res,next)=>
{
   try{ const token=req.headers["x-access-token"]
   const data= jwt.verify(token,'supersecret123456789')
   req.currentAcno=data.currentAcno
    next()
   }
   catch{
       res.status(401).json({
           statusCode:401,
           status:false,
           message:"please log in"
       })
   }
}
//register api
app.post('/register',(req,res)=>{
 
   const result= dataservice.register(req.body.uname,req.body.acno,req.body.password)
   res.status(result.statusCode).json(result)
})
//login api
app.post('/login',(req,res)=>{
 
    const result= dataservice.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
 })
 //deposit api
 app.post('/deposit',jwtmiddleware,(req,res)=>{
 
    const result= dataservice.deposit(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statusCode).json(result)
 })
 
//withdraw api
app.post('/withdraw',jwtmiddleware,(req,res)=>{
 
    const result= dataservice.withdraw(req,req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statusCode).json(result)
 })
 //transaction api
 app.post('/transaction',jwtmiddleware,(req,res)=>{
 
    const result= dataservice.transaction(req.body.acno)
    res.status(result.statusCode).json(result)
 })