"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const prisma_1 = require("../lib/prisma");
class TaskService {
    async create(data) {
        const task = await prisma_1.prisma.task.create({
            data: {
                title: data.title,
                completed: false,
                userId: data.userId
            }
        });
        return task;
    }
    async list() {
        return await prisma_1.prisma.task.findMany();
    }
    async getById(id) {
        return await prisma_1.prisma.task.findUnique({
            where: {
                id
            }
        });
    }
    async update(id, data) {
        return await prisma_1.prisma.task.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        await prisma_1.prisma.task.delete({
            where: { id }
        });
    }
}
exports.TaskService = TaskService;
