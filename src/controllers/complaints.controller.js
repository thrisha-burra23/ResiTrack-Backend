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

export {createComplaint}