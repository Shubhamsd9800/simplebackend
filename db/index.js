 const mongoose=require("mongoose");


 mongoose.connect("mongodb+srv://subhamdas9800:i0ghMUqCiv6VylaK@week4harki.3hftk2g.mongodb.net/fullstackCourse")

const AdminSchema= new mongoose.Schema({
    username:String,
    password:String
})

const UserSchema= new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema=mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number
})


const Admin=mongoose.model('Admin', AdminSchema);
const User=mongoose.model('User', UserSchema)
const Course=mongoose.model('Course', CourseSchema)


module.exports={
    Admin,
    User,
    Course
}