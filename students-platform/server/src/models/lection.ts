import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

const Lections=sequelize.define("Lections",{
    lectionName:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})

export {
    Lections
}