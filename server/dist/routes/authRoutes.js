import { Router } from "express";
import { registerSchema } from "../validation/authValidation.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        res.json(payload);
    }
    catch (error) {
        return res.status(422).json(error);
    }
});
export default router;
