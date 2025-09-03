import mongoose from "mongoose";
const hotelSchema=mongoose.Schema({
    name:String,
    location:String,
    description:String,
    price:Number,
    agency:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
} ,
{ timestamps:true});
const Hotel=mongoose.model("Hotel",hotelSchema);
export default Hotel;