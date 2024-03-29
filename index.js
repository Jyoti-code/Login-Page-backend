import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginDB",{
}, ()=>{
    console.log("DB connected")
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User=new mongoose.model("User",userSchema)

//routes
app.post("/login",(req,res)=>{
    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login successful",user:user})
            }else{
                res.send({message:"Password did'nt match"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})
app.post("/register",(req,res)=>{
    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already registered"})
        }
        else{
            
            const user=new User({
                name,
                email,
                password
            })
            
            user.save((err)=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"Successfully Registered"})
                }
            })
        }
    })
    
})
app.listen(9002,()=>{
    console.log("Be started at port 9002")
})
