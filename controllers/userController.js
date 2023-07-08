const usermodel=require('../db/userschema');
const {v4}=require("uuid");
const {setUser}=require('../utils/auth');
const { startSession } = require('mongoose');
const bcrypt=require('bcrypt')
require('dotenv').config()

module.exports.signController=async(req,res)=>{
    try{
        if(req.body.password!=req.body.confirmpassword)
        {
            res.render('sign',{message:'Password not match'});
            return;
        }
        const count=await usermodel.count({username:req.body.username})
        if(count>0)
        {
            res.render('sign',{message:'Username already taken'})
            return;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await usermodel.insertMany([{ username: req.body.username, email: req.body.email, password: hashedPassword }]);    
        res.render('login')
     }catch(err){
        res.status(500).send({ message:err})
        console.log(err);
     }
}

module.exports.loginController=async (req,res)=>{
    try{
       let username=await usermodel.findOne({username:req.body.EmailUsername})
       if(username==null)
       {
         username=await usermodel.findOne({email:req.body.EmailUsername})
        if(username==null)
        {
            res.render('login',{message:'Wrong email or username'})
            return;
        }
       }
       const isPasswordMatch = await bcrypt.compare(req.body.password, username.password);
       if (!isPasswordMatch) {
         res.render('login', { message: 'Wrong password' });
         return;
       }
       
//=========STATELESS AUTH USING jwt token========       
    const token=process.env.myhash+setUser(username)
    res.cookie('uid',token);
    return res.redirect('/')

//=========STATEFUL AUTH USING sessionid======
    //    const sessionid=v4();
    //    setUser(sessionid,username)
    //    res.cookie('uid',sessionid);
    //    return res.redirect('/')
    }
    catch(err){
       console.log(err)
       res.status(500).send({ message:'Server error......'})
    }
}