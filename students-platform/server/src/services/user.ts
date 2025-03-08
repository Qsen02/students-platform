import { Op } from "sequelize";
import { Courses } from "../models/course";
import { CoursesUsers } from "../models/CoursesStudents";
import { Users } from "../models/user";
import bcrypt from "bcrypt";
import { UserAttributes } from "../types/users";

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

    if (!user) {
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
        include: [
            { model: Users, as: "user" },
            { model: Courses, as: "course" },
        ],
    });

    return sign;
}

async function getAllSignedCoursesForUser(userId: number) {
    const courses = await CoursesUsers.findAll({
        where: { user_id: userId },
        include: [
            { model: Users, as: "user" },
            { model: Courses, as: "course" },
        ],
    });

    return courses;
}

async function getAllCreatedCoursesForLector(userId: number) {
    const courses = await Courses.findAll({
        where: { lector_id: userId },
        include: [
            {
                model: Users,
                as: "lector",
            },
        ],
    });

    return courses;
}

async function editUser(userId: number, data: Partial<UserAttributes>) {
    const updatedUser = await Users.update(data, {
        where: {
            id: userId,
        },
        returning: true,
    });

    return updatedUser;
}

async function changePassword(userId: number, newPassword: string) {
    const user = await Users.findByPk(userId);
    if (!user) {
        throw new Error("Resource not found!");
    }
    const isOldPassword = await bcrypt.compare(newPassword, user.password);
    if (isOldPassword) {
        throw new Error("Old password can't the new password!");
    }
    const updatedUser = await Users.update(
        { password: await bcrypt.hash(newPassword, 10) },
        {
            where: { id: userId },
            returning: true,
        }
    );

    return updatedUser;
}

export {
    register,
    login,
    checkUserId,
    getUserById,
    signUpForCourse,
    getSignById,
    getAllSignedCoursesForUser,
    getAllCreatedCoursesForLector,
    editUser,changePassword
};
