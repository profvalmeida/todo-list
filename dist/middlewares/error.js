"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
function errorMiddleware(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Erro de Validação",
            errors: err.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message,
            }))
        });
    }
    if (err instanceof Error) {
        return res.status(400).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        message: "Erro interno do servidor",
    });
}
