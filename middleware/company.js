
const jwt= require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
const {Company} =require('../db')
function companyMiddleware(req,res,next){
    // const username=req.headers.username;
    // const password=req.headers.password;

    // Admin.findOne({
    //     username: username,
    //     password: password
    // })
    // .then(function(value){
    //     if(value){
    //         next();
    //     }
    //     else{
    //         res.status(403).json({
    //             msg: "Admin Doesn't exist"
    //         })
    //     }
    // })
    // .catch(err=>{
    //     res.status(500).json({
    //         msg:"Internal error"
    //     })
    // })
 
    const token=req.headers.authorization
    const words=token.split(" ");
    const jwtToken=words[1];
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedValue.username){
        next();
    }
    else{
        res.status(403).json({
            msg:"You are not authenticated"
        })
    }
}

module.exports=companyMiddleware