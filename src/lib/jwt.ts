import jwt from 'jsonwebtoken';
import "dotenv/config";

export function generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
    });
}