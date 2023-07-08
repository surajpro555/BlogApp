const express = require('express')
const multer=require('multer')
const route = express.Router();
const blogmodel = require('../db/blogschema')
const { checkLogUser } = require('../middleware/authent')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,`./public/uploads`);
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
});
const upload = multer({ storage: storage });

route.get('/', checkLogUser, (req, res) => res.render('create-blog'));
route.post('/', checkLogUser,upload.single("coverImageUrl"),async(req,res)=>{
  try{
     let img='/img/blog-mage.png';
      if(req.file?.filename){
        img=`/uploads/${req.file.filename}`
      }
      await blogmodel.insertMany([{title:req.body.title,body:req.body.body,coverImageUrl:img,createdBy:req.user._doc._id}])
      res.redirect('Blogs')
  }catch(err){
      res.status(500).json({message:'Sever error....'})
      console.log(err);
  }
});

module.exports=route;