import Agency from '../models/agency.model.js'
//get pending agency
export const getPendingagencies=async(req,res)=>{
   try{
    const agencies=await Agency.find({status:"pending"});
    res.status(200).json(agencies);
   }
   catch(err){
    res.status(500).json({message:"server error",error:err.message});
   }
}
//approve agency use put
export const putApproveagency=async(req,res)=>{
    try{
        const agency=await Agency.findByIdAndUpdate(
             req.params.id,{status:"approved"},
             {
               new:true
             }
        );
        if (!agency) return res.status(404).json({message:"Agency not found"});
        res.status(200).json({message:"Agency approved"});
    }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
    }
}
    //reject agency
   export  const putRejectagency=async(req,res)=>{
         try{
            const agency=await Agency.findByIdAndUpdate(
                req.params.id,{status:"rejected"},{new:true}
            );
            if(!agency) return res.status(404).json({message:"Agency not found"});
            res.status(200).json({message:"Agency rejected",agency});
        }
            catch(err){
                res.status(500).json({message:"server error",error:err.message});
         }
    }
