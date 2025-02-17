import { DataTypes, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";
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

class Users extends Model<UserAttributes> implements UserAttributes {
    public id: number | undefined;
    public fullname!: string;
    public course!: number;
    public role!: "student" | "lector";
    public facultyNumber!: string;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        course: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("student", "lector"),
            allowNull: false,
            defaultValue: "student",
        },
        facultyNumber: {
            type: DataTypes.STRING(8),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Users",
    }
);

export { Users };
