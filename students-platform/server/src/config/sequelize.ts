import { Sequelize } from "sequelize";
import { Assessments } from "../models/assessment";
import { Lections } from "../models/lection";
import { Courses } from "../models/course";
import { Users } from "../models/user";
import { makeAssociations } from "../models/associations";
import { CoursesUsers } from "../models/CoursesStudents";

const dbUser = process.env.DB_USER!;

async function runDB() {
    const sequelize = new Sequelize(
        "students-platform",
        dbUser,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "postgres",
        }
    );
    await sequelize.authenticate();
    await Lections.sync({ alter: true });
    await Courses.sync({ alter: true });
    await Users.sync({ alter: true });
    await Assessments.sync({ alter: true });
    await CoursesUsers.sync({ alter: true });
    makeAssociations();
    console.log("Database is running...");
}

export { runDB };
