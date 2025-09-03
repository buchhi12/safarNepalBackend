import express from 'express'
import auth from '../middlewareauthentication.js'
import {getPendingagencies,putApproveagency,putRejectagency} from '../controllers/Admin.controller.js'
const router =express.Router();
router.get("/agencies/pending",getPendingagencies);
router.put("/agencies/:id/approve",putApproveagency);
router.put("/agencies/:id/reject",putRejectagency);
export default router;