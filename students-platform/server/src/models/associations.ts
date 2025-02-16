import { Courses } from "./course";
import { Grades } from "./grade";
import { Lections } from "./lection";
import { Users } from "./user";

Users.hasMany(Courses,{
    foreignKey:"id",
    as:"courses"
})

Courses.hasMany(Users,{
    foreignKey:"id",
    as:"students"
})

Users.hasMany(Grades,{
    foreignKey:"id",
    as:"grades"
})

Grades.belongsTo(Users,{
    foreignKey:"id",
    as:"student_id"
})

Courses.hasMany(Lections,{
    foreignKey:"id",
    as:"lections"
})

Lections.belongsTo(Courses,{
    foreignKey:"id",
    as:"course_id"
})

Courses.hasOne(Users,{
    foreignKey:"id",
    as:"lector"
})