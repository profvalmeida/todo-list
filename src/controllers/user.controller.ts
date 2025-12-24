import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import loggerPino from "../lib/logger";

export class UserController {
    private userService = new UserService;

    create = async (req: Request, res: Response) => { 
        loggerPino.info("Cadastrando um novo usuário");

        const user = await this.userService.create(req.body);

        loggerPino.info({ userId: user.id }, "Usuário criado com sucesso");
        
        const { password: _, ...semSenha} = user;

        return res.status(201).json(semSenha);
    }

    list =  async (req: Request, res: Response) => {
        const users = await this.userService.list();
        return  res.json(users);
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await this.userService.get(id);  

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.json(user);
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await this.userService.update(id, {
            name,
            email,
            password,
            role
        });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password: _, ...semSenha} = user;

        return res.json(semSenha);
    }

    
    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await this.userService.delete(id);
        return res.status(204).send();
    }

}