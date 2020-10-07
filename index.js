import express from "express";
import accountsRouter from "./routes/accounts.js";
import {promises as fs} from "fs";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const app = express();
app.use(express.json());

app.use("/account", accountsRouter);

app.listen(3000, async () => {
    
    try {
        await readFile(fileName);
        console.log("API na porta 3000!");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        await writeFile(fileName, JSON.stringify(initialJson));
        console.log("json criado, API na porta 3000!");
    }; 
});