import mongoose from "mongoose";
const experienceSchema=mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},// store the id of user who posted this. mongoose.Schema.Types.ObjectId is used for refrencing other documents in mongodb.Ref:user tells mongoose that this id refers to a document in the user collection
 hotel:{type:mongoose.Schema.Types.ObjectId,ref:"Hotel"},
 message:[String],
 mediaUrl:[String]
},
{ timestamps:true});
const Experience=mongoose.model("Experience",experienceSchema);
export default Experience;