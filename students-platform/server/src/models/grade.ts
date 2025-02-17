import { DataTypes, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Grade } from "../types/grades";
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

class Grades extends Model<Grade> implements Grade {
    public id: number | undefined;
    public course_id!: Course;
    public student_id!: UserAttributes;
    public grade!: number;
}

Grades.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Courses",
                key: "id",
            },
        },
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "Grades",
    }
);

export { Grades };
