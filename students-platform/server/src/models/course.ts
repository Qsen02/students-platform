import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

const Courses=sequelize.define("Courses",{
    courseName:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
})

export {
    Courses
}