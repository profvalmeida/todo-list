"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../lib/jwt");
const prisma_1 = require("../lib/prisma");
const crypto_1 = require("crypto");
class AuthService {
    async login({ email, password }) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user)
            throw new Error("Credenciais inválidas");
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch)
            throw new Error("Credenciais inválidas");
        // Access Token (curto)
        const accessToken = (0, jwt_1.generateToken)({
            sub: user.id,
            role: user.role
        });
        // Refresh Token (longo)
        const refreshToken = (0, crypto_1.randomUUID)();
        await prisma_1.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id
            }
        });
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        const storedToken = await prisma_1.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true }
        });
        if (!storedToken)
            throw new Error("Token inválido");
        const newAccessToken = (0, jwt_1.generateToken)({
            sub: storedToken.user.id,
            role: storedToken.user.role
        });
        return { accessToken: newAccessToken };
    }
}
exports.AuthService = AuthService;
