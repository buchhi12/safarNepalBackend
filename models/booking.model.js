import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: Number,
      required: true
    },
    country: {
      type: String,
      required: true
    }
    ,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ,
   
   package: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Package", 
      required: true 
    },
    packageName: {
      type: String,
      required: true
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
