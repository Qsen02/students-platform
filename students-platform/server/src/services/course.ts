import { Op } from "sequelize";
import { Courses } from "../models/course";
import { Users } from "../models/user";
import { Course } from "../types/courses";
import { CoursesUsers } from "../models/CoursesStudents";

async function getLatestCourses() {
    const courses = await Courses.findAll({
        order: [["createdAt", "DESC"]],
        limit: 6,
    });
    return courses;
}

async function getAllCourses() {
    const courses = await Courses.findAll({
        include: [
            {
                model: Users,
            },
        ],
    });
    return courses;
}

async function getCourseById(courseId: number) {
    const course = await Courses.findByPk(courseId, {
        include: [
            {
                model: Users,
                as: "lector",
            },
        ],
    });

    if (!course) {
        throw new Error("Resource not found!");
    }
    return course;
}

async function createCourse(
    courseName: string,
    lectorId: number | undefined,
    courseImage: string | null
) {
    const newCourse = await Courses.create({
        courseName: courseName,
        lector_id: lectorId,
        courseImage: courseImage,
    });
    return newCourse;
}

async function deleteCourse(courseId: number) {
    const rowsAffected = await Courses.destroy({
        where: { id: courseId },
    });
    return rowsAffected;
}

async function updateCourse(courseId: number, data: Partial<Course>) {
    await Courses.update(data, {
        where: { id: courseId },
    });

    const course = await Courses.findByPk(courseId, {
        include: [
            {
                model: Users,
                as: "lector",
            },
        ],
    });
    return course;
}

async function pagination(pageCount: number) {
    const skipCount = pageCount * 6;
    const { count, rows } = await Courses.findAndCountAll({
        include: [
            {
                model: Users,
            },
        ],
        limit: 6,
        offset: skipCount,
    });
    return { courseCount: count, courses: rows };
}

async function checkCourseId(courseId: number) {
    const user = await Courses.findByPk(courseId);
    if (user) {
        return true;
    }
    return false;
}

async function searchCourses(courseName: string) {
    let courses: Course[] | [] = [];
    if (courseName != "No value") {
        courses = await Courses.findAll({
            where: {
                courseName: {
                    [Op.iLike]: `%${courseName}%`,
                },
            },
        });
    } else {
        courses = await Courses.findAll();
    }
    return courses;
}

async function getAllSignedStudentsForCourse(courseId: number) {
    const users = await CoursesUsers.findAll({
        where: { course_id: courseId },
        include: [
            { model: Users, as: "user" },
            { model: Courses, as: "course" },
        ],
    });

    return users;
}
export {
    getCourseById,
    getAllCourses,
    deleteCourse,
    updateCourse,
    createCourse,
    checkCourseId,
    pagination,
    searchCourses,
    getLatestCourses,
    getAllSignedStudentsForCourse
};
