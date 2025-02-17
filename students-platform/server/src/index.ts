import express from "express";
import dotenv from "dotenv";
import { expressConfig } from "./config/express";
import { routerConfig } from "./config/routes";
import { runDB } from "./config/sequelize";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function start() {
    await runDB();

    expressConfig(app);
    routerConfig(app);

    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
}

start();
