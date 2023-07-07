const mongoose=require('mongoose')

const Userschema=mongoose.Schema({
   username:{
     type:String,
     required:true
   },
   email:{
     type:String,
     required:true
   },
   password:{
     type:String,
     required:true
   },
   image:{
     type:String,
     default: 'img/user-image.png'
   },
   AccountType:{
     type:String,
     default:"user"
   },
   date:{
      type:Date,
      default:Date.now
   }
},{timestamps:true});

const model=new mongoose.model('user',Userschema);

module.exports=model;