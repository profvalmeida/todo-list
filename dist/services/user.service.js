"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    async create(data) {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        return prisma_1.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }
    async list() {
        return prisma_1.prisma.user.findMany();
    }
    async get(id) {
        return prisma_1.prisma.user.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });
    }
    async update(id, data) {
        const userExists = await prisma_1.prisma.user.findUnique({
            where: { id }
        });
        if (!userExists) {
            return null;
        }
        let updateData = { ...data };
        if (data.password) {
            updateData.password = await bcrypt_1.default.hash(data.password, 10);
        }
        return prisma_1.prisma.user.update({
            where: { id },
            data: updateData
        });
    }
    async delete(id) {
        return prisma_1.prisma.user.delete({
            where: { id }
        });
    }
}
exports.UserService = UserService;
