const {getUser}=require('../utils/auth')

const checkLogUser=async(req,res,next)=>{
    const userid=req.cookies['uid'];
    if(!userid)
    {
        return res.redirect('/login');
    }
    const user=getUser(userid);
    if(!user)
    {
        return res.redirect('/login');
    }
    req.user=user;
    // console.log(req.user);
    next();
}

module.exports={
    checkLogUser
}