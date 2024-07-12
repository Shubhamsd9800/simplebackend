 const mongoose=require("mongoose");


 mongoose.connect("mongodb+srv://subhamdas9800:i0ghMUqCiv6VylaK@week4harki.3hftk2g.mongodb.net/fullstackCourse")

// const AdminSchema= new mongoose.Schema({
//     username:String,
//     password:String
// })

const CompanySchema= new mongoose.Schema({
    username:String,
    password:String,
   OwnerName:String,
   OwnerEmail:String,
   RollNo:Number
})

// const CourseSchema=mongoose.Schema({
//     title:String,
//     description:String,
//     imageLink:String,
//     price:Number
// })


const Company=mongoose.model('Company', CompanySchema);
// const User=mongoose.model('User', UserSchema)
// const Course=mongoose.model('Course', CourseSchema)


module.exports={
    // Admin,
    // User,
    // Course
    Company
}