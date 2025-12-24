import { somar } from './somar';

/* 
describe → agrupa testes

it → descreve o que está sendo testado

expect → verifica o resultado

*/
describe("Função somar", () => {
    it("deve retornar a soma de dois números", () => {
        const resultado = somar(2, 3);
        expect(resultado).toBe(5);
   });
});

