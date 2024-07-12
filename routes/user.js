const {Router} =require("express");
const router=Router();
const userMiddleware=require("../middleware/user");
const {User, Course} =require("../db")
router.post('/signup', async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    await User.create({
        username,
        password
    })

    res.json({
        msg:"User Created Successfully"
    })

});

router.get("/courses", async (req,res)=>{
        const response=await Course.find({});

        res.json({
            course:response
        })
})

router.post("/courses/:courseId",userMiddleware, async (req,res) => {
        const courseId=req.params.courseId
        const username=req.username;
        console.log(username)
       
        try{
            await User.updateOne({
                username:username
            },{
                    "$push":{
                        purchasedCourses: courseId
                    }
                
            });
    
        }
        catch(e){
            console.log(e)
        }
       
        res.json({
            msg:"Purchase complete"
        })
})

router.get('/purchasedCourses', userMiddleware, async (req,res) => {
    const user= await User.findOne({
        username:req.headers.username
    })

    console.log(user.purchasedCourses)

    const courses=await Course.find({
        _id :{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        courses:courses
    })
})

module.exports=router