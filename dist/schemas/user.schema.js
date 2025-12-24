"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("../lib/zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Nome obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    role: zod_1.z.enum(["ADMIN", "USER"]).default("USER"),
});
