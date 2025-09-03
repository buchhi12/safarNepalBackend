import Hotel from '../models/hotel.model.js'
import Agency from '../models/agency.model.js'
//add hotel
export const addHotel =async(req,res)=>{
    try{
        const{name,location,price,agencyId}=req.body;
        if(!name||!location||!price||!agencyId)
        {
            return res.status(400).json({message:"All fields are required"});
        }

        const agency=await Agency.findById(agencyId);
        if(!agency){
            return res.status(404).json({message:"agency not found"})
        }
        if(agency.role!="agency"){
            return res.status(403).json({message:"User is not an agency"})
        }
        if(agency.status!="approved"){
            return res.status(403).json({message:"Agency not approved"})
        }
        //save hotel in database
        const hotel=await Hotel.create({name,location,price,agency:agencyId});
        return res.status(200).json({message:"Hotel added successfully",hotel});

     }
     catch(err){
           res.status(500).json({message:"Server error",error:err.message});
     }
    }

     //get hotel
     
    export const gethotels = async(req,res)=>{
       try{
        const hotels=await Hotel.find()
        .populate("agency","name email")//.populate("agency", "name email") → replaces agencyId with agency details (only name & email).
          return res.status(200).json(hotels);
  } 
  catch(err) {
    console.err("Error fetching hotels:", err);
    return res.status(500).json({ message: "Server error while fetching hotels" });
  }
    }
 