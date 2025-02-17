import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

const Grades=sequelize.define("Grades",{
    grade:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    course_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'Courses',
            key:"id"
        }
    },
    student_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'Users',
            key:"id"
        }
    }
})

export {
    Grades
}