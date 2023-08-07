const express=require('express');
const User =require("../Models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router=express.Router();
const fetchUser=require("../Middleware/fetchuser");
const secret="ikkaBikka";
router.post(
    "/createUser",
[
    body("Name","Enter a valid name").isLength({min:3}),
    body("Email","Enter a valid Email").isEmail(),
    body("Password","Enter a valid password with min 5 chatacters").isLength({min:5})
],
    async (req,res)=>{
    const result = validationResult(req);
    let flag=false;
    //If there are errors, return bad request
    if(result.isEmpty()){
    //check if a user with this email exists already
        try{
            let user=await User.findOne({Email:req.body.Email});
            if(user){
                return res.status(400).json({flag,error:"User already exists\n"});
            }
            const salt=await bcrypt.genSalt(10);
            const secPass=await bcrypt.hash(req.body.Password,salt)
            user=await User.create({
                Name:req.body.Name,
                Email:req.body.Email,
                Password:secPass
               })
            const data={
                user:{
                    user_id:user.id
                }
            }
            
            const token = jwt.sign(data, secret);
            // console.log(token)
            flag=true;
             res.json({flag,"auth-token":token})
        } 
        catch(e){
            return res.status(500).json({flag,message:"Error Occured. Error: "+e});
        }
    }
    else{
        res.status(400).send({flag,errors:result.array()});
    }
})


router.post(
    "/login",
[
    body("Email").isEmail(),
    body("Password").exists()
],
    async (req,res)=>{
    const result = validationResult(req);
    let flag=false;
    //If there are errors, return bad request
    if(result.isEmpty()){
    //check if a user with this email exists already
    const {Email,Password}= await req.body;
    const user= await User.findOne({Email});
    if(!user){
        return res.status(400).json({flag,message:"Invalid EmailId/Password1"});
        }
        try{
            const isMatched= await bcrypt.compare(Password,user.Password); 
            if(isMatched){
                const data={
                    user:{
                        user_id:user.id,
                    }
                }
                const token =jwt.sign(data,secret);
                flag=true;
                res.json({flag,"auth-token":token})
            }
            else{
                res.status(400).json({flag,error:"Invalid EmailId or Password2"})
            }
        } 
        catch(e){
            return res.status(500).json({flag,message:"Internal Server Error "+e});
        }
    }
    else{
        res.status(400).json({flag,error:"Invalid EmailId/Password3"});
    }
})

router.post('/getuser',fetchUser,async (req,res)=>{
    try{
        const user_id=req.user.user_id;
        const data=await User.findById(user_id).select("-Password");
        res.send({data});
    }catch(e){
            return res.status(500).send("Internal Server Error "+e);
        }
})


module.exports=router;

