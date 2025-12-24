import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService = new AuthService();

    login = async (req: Request, res: Response) => {
        const user = await this.authService.login(req.body);
        return res.json(user);
    }

    refresh = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        const newToken = await this.authService.refresh(refreshToken);
        return res.json(newToken);
    }
}