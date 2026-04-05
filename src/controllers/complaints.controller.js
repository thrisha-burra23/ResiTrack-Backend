import { success } from "zod";
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
        let filter = {};

        // getting resident private complaints and all public complaints
        if (req.user.role === "RESIDENT") {
            filter = {
                $or: [
                    { visibility: "PUBLIC" }, // all public complaints
                    { createdBy: req.user._id } // their own private complaints
                ]
            };
        }

        //  complaints related to staff
        else if (req.user.role === "STAFF") {
            filter = {
                assignedTo: req.user._id
            };
        }

        // admin getting all the complaints

        const complaints = await Complaint.find(filter)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: complaints
        });

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
};

const getComplaintById = async (req, res) => {
    try {
        const id = req.params.id

        const complaint = await Complaint
            .findById(id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")

        if (!complaint) {
            return res.status(404).json({
                error: true,
                message: "Complaint not found"
            })
        }

        if (req.user.role === "RESIDENT") {
            if (
                complaint.visibility === "PRIVATE" &&
                complaint.createdBy.toString() !== req.user._id.toString()
            ) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }
        }

        if (req.user.role === "STAFF") {
            if (complaint.assignedTo?.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }
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

        let complaint;

        //cannot change anything
        if (req.user.role === "RESIDENT") {
            return res.status(403).json({
                message: "Residents cannot update complaints"
            });
        }

        //only status can chnage

        if (req.user.role === "STAFF") {
            const complaintDoc = await Complaint.findById(id);

            if (complaintDoc.assignedTo?.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You can only update assigned complaints"
                });
            }

            const allowedFields = ["status"];
            Object.keys(req.body).forEach(key => {
                if (!allowedFields.includes(key)) delete req.body[key];
            });
        }

        // ADMIN -> full access, can change anything

        complaint = await Complaint.findByIdAndUpdate(id, data, { new: true })


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

const assignComplaint = async (req, res) => {
    try {
        if (req.user.role != "ADMIN") {
            return res.status(403).json({
                message: "Only admin assign"
            })
        }

        const { staffId } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, {
            assignedTo: staffId,
            status: "ASSIGNED"
        }, { new: true })

        res.json({
            success: true,
            data: complaint
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export { createComplaint, getAllComplaints, getComplaintById, updateComplaint, assignComplaint }