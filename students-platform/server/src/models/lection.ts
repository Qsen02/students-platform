import { DataTypes, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Lection } from "../types/lections";
import { Course } from "../types/courses";

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

class Lections extends Model<Lection> implements Lections {
    id: number | undefined;
    lectionName!: string;
    content!: string;
    course_id!: number;
}

Lections.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        lectionName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Courses",
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "Lections",
    }
);

export { Lections };
