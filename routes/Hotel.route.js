import express from 'express'
import auth from '../middlewareauthentication.js'
import {addHotel,gethotels} from"../controllers/Hotel.controller.js"
const router = express.Router();

router.post("/",addHotel);
router.get("/",gethotels);
export default router;