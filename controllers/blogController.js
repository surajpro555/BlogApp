const blogmodel=require('../db/blogschema')

module.exports.createBlogController=async(req,res)=>{
    try{
        const newblog=await blogmodel.insertMany([{title:req.body.title,body:req.body.body,createdBy:req.user._doc._id}])
        res.redirect('Blogs')
    }catch(err){
        res.status(500).json({message:'Sever error....'})
        console.log(err);
    }
};