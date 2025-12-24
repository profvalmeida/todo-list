import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export class UserService {
    async create(data: {
        name: string;
        email: string;
        password: string;
        role?: "ADMIN" | "USER";
    }) {
        
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }

    async list() {
        return prisma.user.findMany();
    }

    async get(id: string) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });
    }

    async update(
        id: string,
        data: {
            name?: string;
            email?: string;
            password?: string;
            role?: "ADMIN" | "USER";
        }
    ) {
        const userExists = await prisma.user.findUnique({
            where: { id }
        });

        if (!userExists) {
            return null;
        }


        let updateData = { ...data };


        if(data.password) {
            updateData.password =  await bcrypt.hash(data.password, 10);
        }

        return prisma.user.update({
            where: { id },
            data: updateData
        });
    }

    async delete(id: string) {
        return prisma.user.delete({
            where: { id }
        });
    }

}