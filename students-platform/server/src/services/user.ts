import { Op } from "sequelize";
import { Courses } from "../models/course";
import { CoursesUsers } from "../models/CoursesStudents";
import { Users } from "../models/user";
import bcrypt from "bcrypt";

async function register(
    fullname: string,
    password: string,
    course: number,
    facultyNumber: string
) {
    const user = await Users.findOne({
        where: {
            fullname: fullname,
            course: course,
            facultyNumber: facultyNumber,
        },
    });
    if (user) {
        throw new Error("This user already exist!");
    }

    const newUser = await Users.create({
        fullname: fullname,
        course: course,
        facultyNumber: facultyNumber,
        role: "student",
        password: await bcrypt.hash(password, 10),
    });

    return newUser;
}

async function login(fullname: string, password: string) {
    const user = await Users.findOne({
        where: { fullname: fullname },
    });
    if (!user) {
        throw new Error("Full name or password don't match!");
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        throw new Error("Full name or password don't match!");
    }

    return user;
}

async function getUserById(userId: number) {
    const user = await Users.findByPk(userId);

    if(!user){
        throw new Error("Resource not found!");
    }

    return user;
}

async function checkUserId(userId: number) {
    const user = await Users.findByPk(userId);
    if (user) {
        return true;
    }
    return false;
}

async function signUpForCourse(userId: number, courseId: number) {
    const newSignStudent = await CoursesUsers.create({
        user_id: userId,
        course_id: courseId,
    });

    return newSignStudent;
}

async function getSignById(userId: number, courseId: number) {
    const sign = await CoursesUsers.findOne({
        where: {
            [Op.and]: [{ user_id: userId }, { course_id: courseId }],
        },
        include: [{ model: Users, as:"user" }, { model: Courses, as:"course"}],
    });

    return sign;
}

async function getAllSignedCoursesForUser(userId:number){
    const courses=await CoursesUsers.findAll({
        where:{user_id:userId},
        include:[
            {
                model:Courses,
                as:"course"
            }
        ]
    });

    return courses;
}

export {
    register,
    login,
    checkUserId,
    getUserById,
    signUpForCourse,
    getSignById,
    getAllSignedCoursesForUser
};
