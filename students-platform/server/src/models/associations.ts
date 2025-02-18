import { Courses } from "./course";
import { Grades } from "./grade";
import { Lections } from "./lection";
import { Users } from "./user";

function makeAssociations(){
    Users.hasMany(Grades,{
        foreignKey:"student_id",
    });

    Grades.belongsTo(Users,{
        foreignKey:"student_id",
    });

    Courses.hasOne(Grades,{
        foreignKey:"course_id"
    })

    Grades.belongsTo(Courses,{
        foreignKey:"course_id"
    })
    
    Courses.hasMany(Lections,{
        foreignKey:"lections",
        as:"lectionId"
    });
    
    Lections.belongsTo(Courses,{
        foreignKey:"course_id",
        as:"lectionId"
    });
    
    Courses.hasMany(Lections);
    
    // Courses.hasOne(Users,{
    //     foreignKey:"lector_id"
    // });
    
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