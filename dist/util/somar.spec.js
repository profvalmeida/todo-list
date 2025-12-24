"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const somar_1 = require("./somar");
/*
describe → agrupa testes

it → descreve o que está sendo testado

expect → verifica o resultado

*/
describe("Função somar", () => {
    it("deve retornar a soma de dois números", () => {
        const resultado = (0, somar_1.somar)(2, 3);
        expect(resultado).toBe(5);
    });
});
