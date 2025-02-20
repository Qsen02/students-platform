import { DataTypes, Model } from "sequelize";
import { Lection } from "../types/lections";
import { sequelize } from "../config/sequelize";

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
