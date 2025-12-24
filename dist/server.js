"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = require("./middlewares/logger");
const env_1 = require("./config/env");
const error_1 = require("./middlewares/error");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_2 = __importDefault(require("./lib/logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Adiciona headers de segurança automaticamente
app.use((0, helmet_1.default)());
// Permite que o frontend acesse a API
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
// Limita a quantidade de requisições por IP
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limita cada IP a 100 requisições por janela
    message: {
        message: "Muitas requisições, tente novamente mais tarde",
    },
}));
app.use(logger_1.logger);
app.use(routes_1.default);
app.use(error_1.errorMiddleware);
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    logger_2.default.info(`${env_1.ENV.APP_NAME} rodando em http://localhost:${env_1.ENV.PORT}`);
});
