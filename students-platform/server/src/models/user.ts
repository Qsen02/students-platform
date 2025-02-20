import { DataTypes, Model } from "sequelize";
import { UserAttributes } from "../types/users";
import { sequelize } from "../config/sequelize";

class Users extends Model<UserAttributes> implements UserAttributes {
    public id: number | undefined;
    public fullname!: string;
    public password!:string;
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
        password:{
            type: DataTypes.STRING,
            allowNull:false
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
