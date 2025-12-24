import { Request, Response, NextFunction } from "express";

export function roleMiddleware(role: "ADMIN" | "USER") {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Acesso negado" });
        }
        next();
     }
}