const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
   name:{
   	type:String,
      required:true,
      trim: true
   },
   email:{
   	type:String,
    required:true,
   },
   password:{
   	type:String,
    required:true
   },
   date:{
    type:Date,
    default:Date.now
   }
});

// Export the Mongoose model for the user schema, using the name "user"
module.exports=mongoose.model('User',userSchema);