import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
        (req as any).user = decoded;
        next();   
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
