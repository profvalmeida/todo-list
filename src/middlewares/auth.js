"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../lib/logger"));
function authMiddleware(req, res, next) {
    // Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization;
    // Se não existir token, bloqueia
    if (!authHeader) {
        logger_1.default.warn("Token Inválido");
        return res.status(401).json({ message: "Token não informado" });
    }
    // Separa o Bearer do token
    const [, token] = authHeader.split(" ");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        // Token inválido ou expirado
        return res.status(401).json({ message: "Token inválido" });
    }
}
