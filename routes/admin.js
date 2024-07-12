const {Router} =require("express");
const router=Router();
const adminMiddleware=require("../middleware/admin")
const {Admin, Course,User} =require("../db");
const {JWT_SECRET} = require("../config");
const jwt=require("jsonwebtoken")
router.post('/signup', async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password
    try{
        await Admin.create({
            username:username,
            password: password
        })
        res.json({
            message:"Admin created Successfully"
        })
    }

    catch(err){
        res.status(500).json({
            msg:"Error creating admin"
        })
    }
    
    

});

router.post('/signin', async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password

    const user=await User.find({
        username,
        password
    })

    if(user){
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            msg:"Incorrect email and pass "
        })
    }
    
})

router.post("/courses", adminMiddleware , async(req,res) => {
        const title=req.body.title
        const description=req.body.description
        const imageLink=req.body.imageLink
        const price=req.body.price
        
        try{
            const newCourse=await Course.create({
                title,
                description,
                imageLink,
                price
            })
            res.json({
                message:"Course created Successfully", 
                courseId: newCourse._id
            })
        }
        catch(err){
            res.status(500).json({
                message:"Error creating course"
            })
        }
        
})

router.get('/courses', adminMiddleware, async (req,res) => {
    const response= await Course.find({});

    res.json({
        courses:response
    })
})

module.exports=router


 