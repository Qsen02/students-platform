import { DataTypes, INTEGER, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

const Users = sequelize.define("Users", {
    fullname: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
    course: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type:DataTypes.ENUM("student","lector"),
        allowNull: false,
        defaultValue: "student"
    },
    facultyNumber: {
        type: DataTypes.STRING(8),
        allowNull: false,
    },
});

export { Users };
