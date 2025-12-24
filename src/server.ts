import express from "express"; 
import router from "./routes";
import { logger } from "./middlewares/logger";
import { ENV } from "./config/env";
import { errorMiddleware } from "./middlewares/error";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import loggerPino from "./lib/logger";

const app = express();

app.use(express.json());

// Adiciona headers de segurança automaticamente
app.use(helmet());


// Permite que o frontend acesse a API
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);


// Limita a quantidade de requisições por IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limita cada IP a 100 requisições por janela
    message: {
      message: "Muitas requisições, tente novamente mais tarde",
    },
  })
);


app.use(logger);

app.use(router);

app.use(errorMiddleware);

const PORT = ENV.PORT || 3333;

app.listen(PORT, () => {
  loggerPino.info(`${ENV.APP_NAME} rodando em http://localhost:${ENV.PORT}`);
});