import { prisma } from "../src/lib/prisma";

async function main() {
   const user = await prisma.user.create({
      data: {
         name: "Vinicius",
         email: "vinicius@gmail.com",
         password: "123456", 
         role: "ADMIN" 
      }
   });

   await prisma.task.create({
        data: {
            title: "Tarefa de exemplo",
            completed: false,
            userId: user.id
        }
   })
}

main()
    .catch((e) => { 
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });