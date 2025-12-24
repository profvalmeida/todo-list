import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import loggerPino from "../lib/logger";

export class TaskController {
    private taskService = new TaskService;

    create = async (req: Request, res: Response) => {
        const task = await this.taskService.create(req.body);
        return res.status(201).json(task);
        
    }

    list = async (req: Request, res: Response) => {
        loggerPino.info("Listando tarefas");
        const tasks = await this.taskService.list();
        return res.json(tasks);
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;

        const task = await this.taskService.getById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    
        return res.json(task);
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        const task = await this.taskService.update(id, req.body);

        return res.json(task);
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await this.taskService.delete(id);
        return res.status(204).send();
    }
}