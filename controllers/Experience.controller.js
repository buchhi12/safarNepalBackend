import Experience from '../models/experience.model.js'
import User from "../models/users.model.js";
import Hotel from "../models/hotel.model.js";

//add experience
export const addexperience=async(req,res)=>{
    try{
        
        const{userId,hotelId,message,mediaUrl}=req.body;
          // Validate required fields
    if (!userId || !hotelId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
       //check user exists
        const user=await User.findByiD(userId);
        if(!user) {
            return res.status(500).json({message:"user not found"});
        }
        //if Hotel exists or not
        const hotel=await Hotel.findById(hotelId);
        if(!hotelId) return res.status(404).json({message:"hotel no found"});
        
        //create experinece
        const experience = await Experience.create({
            user:userId,
            hotel:hotelId,
            message,mediaUrl
        });
        res.status(200).json({message:"Experience added",experience});

    }
    catch(err){
        res.status(500).json({message:"server error "})
    }
}

    //get experience
export  const getexperinece = async(req,res)=>{
        try{
            const experiences=await Experience.find()
            .populate("user","name email")
            .populate("hotel","name location");
            res.status(200).json({message:"Experience",experiences})
        }
        catch(err){
             res.status(500).json({message:"server error "})
        }
    }
