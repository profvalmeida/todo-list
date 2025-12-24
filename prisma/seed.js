"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/lib/prisma");
async function main() {
    const user = await prisma_1.prisma.user.create({
        data: {
            name: "Vinicius",
            email: "vinicius@gmail.com",
            password: "123456",
            role: "ADMIN"
        }
    });
    await prisma_1.prisma.task.create({
        data: {
            title: "Tarefa de exemplo",
            completed: false,
            userId: user.id
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.prisma.$disconnect();
});
