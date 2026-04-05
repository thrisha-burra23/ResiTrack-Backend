import mongoose from "mongoose"

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"],
        required: true
    },
    visibility: {
        type: String,
        enum: ["PUBLIC", "PRIVATE"],
        required: true
    },
    status: {
        type: String,
        enum:["OPEN", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"],
        default: "OPEN",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ["PLUMBING", "ELECTRICITY", "LIFT", "PARKING"],
        required: true
    }
},
    { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint