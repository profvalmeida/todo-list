"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("../lib/zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Título obrigatório"),
    userId: zod_1.z.string().uuid("UserId inválido"),
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    completed: zod_1.z.boolean().optional(),
});
