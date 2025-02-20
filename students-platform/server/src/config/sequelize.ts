import { Sequelize } from "sequelize";

const dbUser = process.env.DB_USER!;

const sequelize = new Sequelize(
    "students-platform",
    dbUser,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    }
);

export { sequelize };
