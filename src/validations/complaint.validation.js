import { z } from "zod"

const complaintSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"], {
        required_error: "Priority is required",
    }),
    visibility: z.enum(["PUBLIC", "PRIVATE"], {
        required_error: "Visibility is required",
    }),
    status: z.enum(["OPEN", "CLOSED", "ASSIGNED", "RESOLVED", "IN_PROGRESS"]).default("OPEN"),
    category: z.enum(["PLUMBING", "ELECTRICITY", "LIFT", "PARKING"], {
        required_error: "Category is required",
    })
})

export { complaintSchema }