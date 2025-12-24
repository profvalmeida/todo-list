import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import loggerPino from "../lib/logger";

declare global {
    namespace Express {
        interface Request {
            user: {
                sub: string;
                role: "USER" | "ADMIN";
            }
        }

    }
}


export { };


interface JwtPayload {
    sub: string;
    role: "USER" | "ADMIN";
}


export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    // Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization;

    // Se não existir token, bloqueia
    if (!authHeader) {
        loggerPino.warn("Token Inválido");
        return res.status(401).json({ message: "Token não informado" });
    }

    // Separa o Bearer do token
    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.user = decoded;

         next();

    }catch (error) {
        // Token inválido ou expirado
        
         return res.status(401).json({ message: "Token inválido" });
    }


}