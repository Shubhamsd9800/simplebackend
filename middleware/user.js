const { User }=require("../db")
const jwt= require("jsonwebtoken")
const {JWT_SECRET}=require("../config")

function userMiddleware(req,res,next){
    // const username=req.headers.username;
    // const password=req.headers.password

    // User.findOne({
    //     username:username,
    //     password: password
    // })
    // .then(function(value){
    //     if(value){
    //         next();
    //     }
    //     else{
    //         res.status(403).json({
    //             msg: "User Doesn't exist"
    //         })
    //     }
    // })

    const token=req.headers.authorization
    //Bearer dshfkkdjlfflcjmc 
    const words=token.split(" ");
    const jwtToken=words[1];
    const decodedValue=jwt.verify(jwtToken,JWT_SECRET)
    if(decodedValue.username){
        req.username=decodedValue.username
        next();
    }
    else{
        res.status(403).json({
            msg:"You are not authenticated"
        })
    }
}

module.exports=userMiddleware;

