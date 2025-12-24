"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Teste de integração de Login", () => {
    it("deve retornar token ao realizar o login", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({
            email: "joaoalmeida@gmail.com",
            password: "123mudar"
        });
        expect(response.status).toBe(200);
    });
});
