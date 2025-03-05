import { Courses } from "./course";
import { Assessments } from "./assessment";
import { Lections } from "./lection";
import { Users } from "./user";
import { CoursesUsers } from "./CoursesStudents";

function makeAssociations() {
    Users.hasMany(Assessments, {
        foreignKey: "student_id",
    });

    Assessments.belongsTo(Users, {
        foreignKey: "student_id",
    });

    Courses.hasOne(Assessments, {
        foreignKey: "course_id",
    });

    Assessments.belongsTo(Courses, {
        foreignKey: "course_id",
    });

    Lections.belongsTo(Courses, {
        foreignKey: "course_id",
    });

    Courses.hasMany(Lections, {
        foreignKey: "course_id",
    });

    Courses.belongsTo(Users, {
        foreignKey: "lector_id",
        as:"lector"
    });

    Users.hasMany(Courses, {
        foreignKey: "lector_id",
    });

    Users.belongsToMany(Courses, {
        through: "CoursesUsers",
    });

    Courses.belongsToMany(Users, {
        through: "CoursesUsers",
    });

    CoursesUsers.belongsTo(Users, { foreignKey: "user_id", as: "user" });
    CoursesUsers.belongsTo(Courses, { foreignKey: "course_id", as: "course" });
}

export { makeAssociations };
