import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image:{type:String,required:false},

  itinerary: { type: [String], required: true },
  famousPlaces:{type:[String],required:true},
  trekkingDestinations:{type:[String],required:true},
  activities: { type: [String], required: true },
  includes: { type: [String], required: true },
  excludes: { type: [String], required: true },
  price: { type: Number, required: true },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);
