import { Router } from "express";
import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
const router = Router();
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        res.json(payload);
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors });
        }
        return res.status(500).json({ message: "Something went wrong, please try again!" });
    }
});
export default router;
