import Complaint from "../models/complaint.model.js";

const createComplaint = async (req, res) => {
    try {
        const data = req.body;
        const newComplaint = await Complaint.create({
            ...data,
            createdBy: req.userId
        });

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully!",
            data: newComplaint
        })


    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

const getAllComplaints = async (req, res) => {
    try {


        const complaints = await Complaint
            .find()
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")

        res.json({
            success: true,
            message: "Fetched complaints successfully!",
            data: complaints
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

const getComplaintById = async (req, res) => {
    try {
        const id = req.params.id

        const complaint = await Complaint
            .find(id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")

        if (!complaint) {
            return res.status(404).json({
                error: true,
                message: "Complaint not found"
            })
        }

        res.json({
            success: true,
            message: "fetching  data for id is successfull!",
            data: complaint
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

const updateComplaint = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body
        const complaint = await Complaint.findByIdAndUpdate(id, data, { new: true })

        res.json({
            success: true,
            message: "Complaint updated",
            data: complaint
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export { createComplaint, getAllComplaints, getComplaintById, updateComplaint }