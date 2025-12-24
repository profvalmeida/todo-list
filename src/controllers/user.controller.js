"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const logger_1 = __importDefault(require("../lib/logger"));
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService;
        this.create = async (req, res) => {
            logger_1.default.info("Cadastrando um novo usuário");
            const user = await this.userService.create(req.body);
            logger_1.default.info({ userId: user.id }, "Usuário criado com sucesso");
            const { password: _, ...semSenha } = user;
            return res.status(201).json(semSenha);
        };
        this.list = async (req, res) => {
            const users = await this.userService.list();
            return res.json(users);
        };
        this.getById = async (req, res) => {
            const { id } = req.params;
            const user = await this.userService.get(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        };
        this.update = async (req, res) => {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            const user = await this.userService.update(id, {
                name,
                email,
                password,
                role
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const { password: _, ...semSenha } = user;
            return res.json(semSenha);
        };
        this.delete = async (req, res) => {
            const { id } = req.params;
            await this.userService.delete(id);
            return res.status(204).send();
        };
    }
}
exports.UserController = UserController;
