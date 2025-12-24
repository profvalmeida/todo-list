"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        this.login = async (req, res) => {
            const user = await this.authService.login(req.body);
            return res.json(user);
        };
        this.refresh = async (req, res) => {
            const { refreshToken } = req.body;
            const newToken = await this.authService.refresh(refreshToken);
            return res.json(newToken);
        };
    }
}
exports.AuthController = AuthController;
