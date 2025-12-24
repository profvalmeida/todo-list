import bcrypt from "bcrypt";
import { generateToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { randomUUID } from "crypto";

interface loginDTO {
    email: string;
    password: string;
}


export class AuthService {
    async login({ email, password }: loginDTO) {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new Error("Credenciais inválidas");

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) throw new Error("Credenciais inválidas");

        // Access Token (curto)
        const accessToken = generateToken({
            sub: user.id,
            role: user.role
        })
        

        // Refresh Token (longo)
        const refreshToken = randomUUID();

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id
            }
        });

        return { accessToken, refreshToken };
    }

    async refresh(refreshToken: string) {
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true }
        });

        if (!storedToken) throw new Error("Token inválido");

        const newAccessToken = generateToken({
            sub: storedToken.user.id,
            role: storedToken.user.role
        })

        return { accessToken: newAccessToken };
    }
}