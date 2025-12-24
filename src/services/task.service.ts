import { prisma } from '../lib/prisma';

interface CreateTaskDTO {
  title: string;
  userId: string;
}


export class TaskService {
    async create(data: CreateTaskDTO) {
        const task = await prisma.task.create({
            data: {
                title: data.title,
                completed: false,
                userId: data.userId
            }
        });
          return task;
    }

    async list () {
        return await prisma.task.findMany();
    }

    async getById(id: string) {
        return await prisma.task.findUnique({
            where: {
                id
            }
        }); 
        
    }

    async update(id: string, data: { title?: string; completed?: boolean }) {
        return await prisma.task.update({
            where: { id }, 
            data       
        });
    }


    async delete(id: string) {
        await prisma.task.delete({
            where: { id }
        }); 
    }
  
}