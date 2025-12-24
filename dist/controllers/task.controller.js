"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const logger_1 = __importDefault(require("../lib/logger"));
class TaskController {
    constructor() {
        this.taskService = new task_service_1.TaskService;
        this.create = async (req, res) => {
            const task = await this.taskService.create(req.body);
            return res.status(201).json(task);
        };
        this.list = async (req, res) => {
            logger_1.default.info("Listando tarefas");
            const tasks = await this.taskService.list();
            return res.json(tasks);
        };
        this.getById = async (req, res) => {
            const { id } = req.params;
            const task = await this.taskService.getById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.json(task);
        };
        this.update = async (req, res) => {
            const { id } = req.params;
            const task = await this.taskService.update(id, req.body);
            return res.json(task);
        };
        this.delete = async (req, res) => {
            const { id } = req.params;
            await this.taskService.delete(id);
            return res.status(204).send();
        };
    }
}
exports.TaskController = TaskController;
