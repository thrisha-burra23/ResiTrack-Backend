import express from "express"
import verifyAccessToken from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { complaintSchema } from "../validations/complaint.validation.js";
import { createComplaint, getAllComplaints, getComplaintById, updateComplaint } from "../controllers/complaints.controller.js";

const complaintRouter=express.Router();

complaintRouter.post("/create-complaint",verifyAccessToken,validate(complaintSchema),createComplaint)
complaintRouter.get("/",verifyAccessToken,getAllComplaints)
complaintRouter.get("/:id",verifyAccessToken,getComplaintById)
complaintRouter.patch("/:id",verifyAccessToken,updateComplaint)

export default complaintRouter