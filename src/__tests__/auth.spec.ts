import request from "supertest";
import app from "../app";

describe("Teste de integração de Login", () => {
    it("deve retornar token ao realizar o login", async () => {
        const response = await request(app) 
         .post("/login")
         .send({
            email: "joaoalmeida@gmail.com",
            password: "123mudar"
         });

         expect(response.status).toBe(200);
    })
})