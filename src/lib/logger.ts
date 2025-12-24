import pino from "pino";

const loggerPino = pino({
    level: "info",

    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
        }
    }
});


export default loggerPino;