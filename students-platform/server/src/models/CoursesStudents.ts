import { DataTypes, Model } from "sequelize";
import { CoursesStudents } from "../types/CoursesStudents";
import { sequelize } from "../config/sequelize";
import { Courses } from "./course";
import { Users } from "./user";

class CoursesUsers extends Model<CoursesStudents> implements CoursesStudents{
    public course_id!:number;
    public user_id!:number;
}

CoursesUsers.init({
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
            model:Users,
            key:"id"
        }
    },
    course_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
            model:Courses,
            key:"id"
        }
    },
},{
    sequelize,
    tableName:"CoursesUsers",
    timestamps:false,
    underscored: true
})

export {
    CoursesUsers
}