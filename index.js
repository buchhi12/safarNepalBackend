import dotenv from 'dotenv';
dotenv.config({path:"./secretkey.env"});
console.log('Test ENV Key:', process.env.CLOUDINARY_API_KEY);
console.log("Loaded Khalti Secret Key:", process.env.KHALTI_SECRET_KEY);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cloudinary from './utils/cloudinary.js';
import fetch from 'node-fetch';
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import hotelRoutes from "./routes/Hotel.route.js";
import userRoutes from "./routes/User.route.js";
import reviewRoutes from "./routes/reviewroute.js";
import packagesRoutes from "./routes/packages.route.js";
import packageRoutes from "./routes/package.route.js";

import bookingRoutes from "./routes/booking.route.js";
import khaltiRoutes from "./routes/khaltiroutes.js";

const app=express()
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;



//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
//app.use("/api/hotel",hotelRoutes);
app.use("/api/User",userRoutes);
app.use("/api/package",packageRoutes);
app.use("/api/packages",packagesRoutes);
app.use('/api/reviews', reviewRoutes);

app.use("/api/booking",bookingRoutes);

app.use("/api/khalti", khaltiRoutes);


// Routes
//app.use("/api/khalti", khaltiRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SafarNepal Backend Running...");
});




mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => console.log('Server running on port 3000'));
})
  .catch(()=>{
    console.log("connectionn failed")
  })


  