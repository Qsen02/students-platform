import { DataTypes, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";
import { CoursesStudents } from "../types/CoursesStudents";
import { Course } from "../types/courses";
import { UserAttributes } from "../types/users";

dotenv.config();

const dbUser=process.env.DB_USER!;
const sequelize=new Sequelize("students-platform",dbUser,process.env.DB_PASSWORD,{
        host:"localhost",
        dialect:"postgres"
});

class CoursesUsers extends Model<CoursesStudents> implements CoursesStudents{
    public course_id!:Course;
    public user_id!:UserAttributes;
}

CoursesUsers.init({
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
},{
    sequelize,
    tableName:"CoursesStudents"
})

export {
    CoursesUsers
}