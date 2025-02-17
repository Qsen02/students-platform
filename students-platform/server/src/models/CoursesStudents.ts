import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

const CoursesUsers=sequelize.define("CoursesStudents",{
    course_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        references:{
            model:'Courses',
            key:"id"
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        references:{
            model:'Users',
            key:"id"
        }
    }
})

export {
    CoursesUsers
}