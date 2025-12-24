import { title } from "node:process";
import { z } from "../lib/zod";

export const createTaskSchema = z.object({
    title: z.string().min(3, "Título obrigatório"),
    userId: z.string().uuid("UserId inválido"),
});

export const updateTaskSchema = z.object({
    title: z.string().optional(),
    completed: z.boolean().optional(),
});