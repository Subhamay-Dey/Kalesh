import { Router } from "express";
import prisma from "../config/databse.js";
const router = Router();
router.get("/verify-email", async (req, res) => {
    const { email, token } = req.query;
    if (email && token) {
        const user = await prisma.user.findUnique({ where: {
                email: email
            } });
        if (user) {
            if (token === user.email_verify_token) {
                // Redirect to front page
                await prisma.user.update({
                    data: {
                        email_verify_token: null,
                        email_verified_at: new Date().toISOString()
                    },
                    where: {
                        email: email
                    }
                });
                return res.redirect(`${process.env.CLIENT_APP_URL}/login`);
            }
        }
    }
    return res.redirect("/verify-error");
});
router.get("/verify-email", (req, res) => {
    return res.render("auth/emailVerifyError");
});
export default router;
