import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import hotelRoutes from "./routes/Hotel.route.js";
import userRoutes from "./routes/User.route.js";
import experienceRoutes from "./routes/experience.route.js";
import packagesRoutes from "./routes/packages.route.js";
import packageRoutes from "./routes/package.route.js";

import bookingRoutes from "./routes/booking.route.js";

dotenv.config({path:"./secretkey.env"});

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

app.use("/api/experience",experienceRoutes);
app.use("/api/booking",bookingRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => console.log('Server running on port 3000'));
})
  .catch(()=>{
    console.log("connectionn failed")
  })

