import { DataTypes, Model } from "sequelize";
import { Assessment } from "../types/assassments";
import { sequelize } from "../config/sequelize";

class Assessments extends Model<Assessment> implements Assessments {
    public id: number | undefined;
    public course_id!: number;
    public student_id!: number;
    public assessment!: number;
}

Assessments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        assessment: {
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
        tableName: "Assessments",
    }
);

export { Assessments };
