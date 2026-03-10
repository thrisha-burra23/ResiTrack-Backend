import { z } from "zod"

const registerSchema = z.object({
    name: z.string({ required_error: "Name should not be empty" }).min(3, "Name must be atleast 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be atleast 6 characters")
    
})

const loginSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

export { registerSchema , loginSchema}