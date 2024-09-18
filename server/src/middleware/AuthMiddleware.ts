import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next:NextFunction) => {
    const authHeader = req.headers.authorization
    if(authHeader === null || authHeader === undefined) {
        return res.status(401).json({status: 401, message: "UnAuthorized"})
    }

    const token = authHeader.split(" ")[1]

    // Verify Token 
    jwt.verify(token, process.env.SECRET_KEY! , (err, user) => {
        if(err) {
            return res.status(401).json({status: 401, message: "UnAuthorized"})
        }
        req.user = user as AuthUser
        next();
    })
}

export default authMiddleware;