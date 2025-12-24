import { z } from "../lib/zod";

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha obrigatória"),
});


