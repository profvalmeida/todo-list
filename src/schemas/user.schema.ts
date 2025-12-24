import { z } from "../lib/zod";

export const createUserSchema = z.object({
    name: z.string().min(3, "Nome obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    role: z.enum(["ADMIN", "USER"]).default("USER"),
});

