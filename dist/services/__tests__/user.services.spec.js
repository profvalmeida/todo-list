"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../user.service");
// Importa o prisma (que será substituído por um mock)
const prisma_1 = require("../../lib/prisma");
// Importa o bcrypt, pois o service usa hash de senha
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * MOCK DO PRISMA
 * Aqui dizemos ao Jest:
 * "Quando alguém importar o prisma, use essa versão falsa"
 */
jest.mock("../../lib/prisma", () => ({
    prisma: {
        user: {
            // Função falsa para criar usuário
            create: jest.fn(),
            // Função falsa para listar usuários
            findMany: jest.fn(),
            // Função falsa para buscar usuário por ID
            findUnique: jest.fn(),
            // Função falsa para atualizar usuário
            update: jest.fn(),
            // Função falsa para deletar usuário
            delete: jest.fn(),
        },
    },
}));
/**
 * MOCK DO BCRYPT
 * Evita gerar hash real durante os testes
 */
jest.mock("bcrypt", () => ({
    // Função falsa para hash de senha
    hash: jest.fn(),
}));
describe("UserService - CRUD", () => {
    // O service é real, o banco é falso
    const userService = new user_service_1.UserService();
    //CREATE
    it("deve criar um usuário com senha criptografada", async () => {
        //Retorno
        bcrypt_1.default.hash.mockResolvedValue("hashed-password");
        // Simula o retorno do Prisma ao criar o usuário
        prisma_1.prisma.user.create.mockResolvedValue({
            id: "1",
            name: "João",
            email: "joao@email.com",
            password: "hashed-password",
            role: "USER",
        });
        //Execução
        // Executa o método REAL do service
        const user = await userService.create({
            name: "João",
            email: "joao@email.com",
            password: "123456",
        });
        //Validação
        // Verifica se a senha foi criptografada corretamente
        expect(bcrypt_1.default.hash).toHaveBeenCalledWith("123456", 10);
        // Verifica se o Prisma foi chamado para criar o usuário
        expect(prisma_1.prisma.user.create).toHaveBeenCalled();
        // Verifica se o usuário retornado possui ID
        expect(user).toHaveProperty("id");
    });
    //LIST
    it("Listar todos usuários da aplicação", async () => {
        //Retorno
        // Simula retorno do banco com dois usuários
        prisma_1.prisma.user.findMany.mockResolvedValue([
            { id: "1", name: "João" },
            { id: "2", name: "Maria" },
        ]);
        //Execução
        const users = await userService.list();
        //Validacao
        // Verifica se retornou dois usuários
        expect(users.length).toBe(2);
        // Verifica se o Prisma foi chamado
        expect(prisma_1.prisma.user.findMany).toHaveBeenCalled();
    });
    //GET
    it("Listar usuários por id", async () => {
        //Retorno
        // Simula retorno do banco para busca por ID
        prisma_1.prisma.user.findUnique.mockResolvedValue({
            id: "1",
            name: "João",
            tasks: [],
        });
        //Execução
        // Executa o método real get()
        const user = await userService.get("1");
        //Validação 
        // Verifica se retornou um usuário
        expect(user).toHaveProperty("id");
        // Verifica se o Prisma foi chamado com os parâmetros corretos
        expect(prisma_1.prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: "1" },
            include: { tasks: true },
        });
    });
    //UPDATE
    it("Atualizar um usuário", async () => {
        //Retorno
        // Simula que o usuário existe
        prisma_1.prisma.user.findUnique.mockResolvedValue({ id: "1" });
        // Simula hash da nova senha
        bcrypt_1.default.hash.mockResolvedValue("new-hash");
        // Simula retorno do Prisma após atualização
        prisma_1.prisma.user.update.mockResolvedValue({
            id: "1",
            name: "João Atualizado",
        });
        //Execução
        // Executa o método real update()
        const user = await userService.update("1", {
            name: "João Atualizado",
            password: "novaSenha",
        });
        //Validação
        // Verifica se a senha foi criptografada novamente
        expect(bcrypt_1.default.hash).toHaveBeenCalled();
        // Verifica se o Prisma executou o update
        expect(prisma_1.prisma.user.update).toHaveBeenCalled();
        // Verifica se o nome foi atualizado
        expect(user?.name).toBe("João Atualizado");
    });
    //DELETE
    it("Deletar um usuário", async () => {
        //Retorno
        // Simula retorno do Prisma ao deletar usuário
        prisma_1.prisma.user.delete.mockResolvedValue({
            id: "1",
        });
        //Execução
        // Executa o método real delete()
        const user = await userService.delete("1");
        //Validação
        // Verifica se retornou o usuário deletado
        expect(user).toHaveProperty("id");
        // Verifica se o Prisma foi chamado
        expect(prisma_1.prisma.user.delete).toHaveBeenCalled();
    });
});
