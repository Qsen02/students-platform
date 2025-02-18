import { DataTypes, INTEGER, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Course } from "../types/courses";
import { UserAttributes } from "../types/users";

dotenv.config();

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

class Courses extends Model<Course> implements Course {
    public id: number | undefined;
    public courseName!: string;
    public lector_id!: number;
}

Courses.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        courseName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        lector_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "Courses",
    }
);

export { Courses };
