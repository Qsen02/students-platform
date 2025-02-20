import { makeAssociations } from "../models/associations";
import { sequelize } from "./sequelize";

async function runDB() {
    await sequelize.authenticate();
    makeAssociations();
    await sequelize.sync({ alter: true });
    console.log("Database is running...");
}

export { runDB };
