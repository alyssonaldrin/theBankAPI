import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
import winston from "winston";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "theBankAPI.log" })
    ],
    format: combine(
        label({ label: "theBankAPI" }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use("/account", accountsRouter);
app.listen(3000, async () => {

    try {
        await readFile(fileName);
        logger.info("API na porta 3000!");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        try {
            await writeFile(fileName, JSON.stringify(initialJson));
            logger.info("json criado, API na porta 3000!");
        } catch (err) {
            logger.error(err);
        }
    };
});