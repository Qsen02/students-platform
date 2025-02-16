import { Sequelize } from "sequelize";
import { Grades } from "../models/grade";
import { Lections } from "../models/lection";
import { Courses } from "../models/course";
import { Users } from "../models/user";

const dbUser=process.env.DB_USER!;

async function runDB(){
    const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
    })
    await sequelize.authenticate();
    await Grades.sync();
    await Lections.sync();
    await Courses.sync();
    await Users.sync();
    console.log("Database is running...");
}

export {
    runDB
}