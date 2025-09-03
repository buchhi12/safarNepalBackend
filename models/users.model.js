import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String,enum:["user","agency","admin"],default:"user"},
    
},
{ timestamps:true});
const User = mongoose.model("User",userSchema);
export default User;