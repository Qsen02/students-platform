import { DataTypes, Model } from "sequelize";
import { Course } from "../types/courses";
import { sequelize } from "../config/sequelize";

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
