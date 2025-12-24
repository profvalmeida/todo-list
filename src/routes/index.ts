import { Router } from 'express';
import { UserController } from "../controllers/user.controller";
import { TaskController } from "../controllers/task.controller"; 
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schemas/user.schema';
import { loginSchema } from '../schemas/auth.schema';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';
import { authMiddleware } from '../middlewares/auth';
import { roleMiddleware } from '../middlewares/role';

const router = Router();

const userController = new UserController();
const taskController = new TaskController();
const authController = new AuthController();


// User routes
router.post("/users",authMiddleware, roleMiddleware("ADMIN"), validate(createUserSchema), userController.create);
router.get("/users", authMiddleware, roleMiddleware("ADMIN"),  userController.list);
router.get("/users/:id", authMiddleware, roleMiddleware("ADMIN"), userController.getById);
router.put("/users/:id", authMiddleware, roleMiddleware("ADMIN"),  userController.update);
router.delete("/users/:id", authMiddleware, roleMiddleware("ADMIN"), userController.delete); 


//Taks routes
router.post("/tasks", authMiddleware, validate(createTaskSchema) , taskController.create);
router.get("/tasks", authMiddleware, taskController.list);
router.get("/tasks/:id", authMiddleware, taskController.getById);
router.put("/tasks/:id", authMiddleware, validate(updateTaskSchema) , taskController.update);
router.delete("/tasks/:id", authMiddleware, taskController.delete); 


router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refresh);


export default router;