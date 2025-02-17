import { DataTypes, INTEGER, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

const Courses=sequelize.define("Courses",{
    courseName:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    lector_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'Users',
            key:"id"
        }
    },
    students:{
        type:DataTypes.ARRAY(INTEGER),
        references:{
            model:'CoursesStudents',
            key:"user_id"
        }
    },
    lections:{
        type:DataTypes.ARRAY(INTEGER),
        references:{
            model:'Lections',
            key:"id"
        }
    }
})

export {
    Courses
}