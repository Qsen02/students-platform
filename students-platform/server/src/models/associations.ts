import { Courses } from "./course";
import { Grades } from "./grade";
import { Lections } from "./lection";
import { Users } from "./user";

function makeAssociations(){
    Grades.belongsTo(Users,{
        foreignKey:"student_id",
        as:"studentId"
    });

    Users.hasMany(Grades,{
        foreignKey:"grades",
        as:"studentId"
    });
    
    Courses.hasMany(Lections,{
        foreignKey:"lections",
        as:"lectionId"
    });
    
    Lections.belongsTo(Courses,{
        foreignKey:"course_id",
        as:"lectionId"
    });
    
    Courses.hasOne(Users,{
        foreignKey:"lector_id"
    });
    
    Users.belongsToMany(Courses,{
       through:"CoursesUsers",
    });
    
    Courses.belongsToMany(Users,{
       through:"CoursesUsers",
    });
}

export {
    makeAssociations
}