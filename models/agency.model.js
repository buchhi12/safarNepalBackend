import mongoose from 'mongoose'
const agencySchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String},
    hotel:[{type:mongoose.Schema.Types.ObjectId,ref:"Hotel"}],
    status:{type:String,enum:["pending","approved","rejected"],default:"pending"}

} 
,
{ timestamps:true}
);

const Agency=mongoose.model("Agency",agencySchema);
export default Agency;