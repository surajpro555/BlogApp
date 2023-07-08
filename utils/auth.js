// =====================STATEFULL AUTH===================
// const sessionid=new Map();

// function setUser(id,user) {
//    sessionid.set(id,user)
// }

// function getUser(id) {
//    return sessionid.get(id);
// }

// module.exports={
//     setUser,
//     getUser
// }


// =====================STATELESS AUTH===================
const jwt=require('jsonwebtoken')
require('dotenv').config()

function setUser(user) {
   const payload={...user}
   return jwt.sign(payload,process.env.JWTSECRETKEY);
}

function getUser(token) {
   return jwt.verify(token.substring(630),process.env.JWTSECRETKEY)
}

module.exports={
    setUser,
    getUser
}