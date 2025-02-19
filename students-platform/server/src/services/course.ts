import { Op } from "sequelize";
import { Courses } from "../models/course";
import { Users } from "../models/user";
import { Course } from "../types/courses";

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
            },
        ],
    });
    return course;
}

async function createCourse(courseName: string, lectorId: number | undefined) {
    const newCourse = await Courses.create({
        courseName: courseName,
        lector_id: lectorId,
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
    const updatedCourse = await Courses.update(data, {
        where: { id: courseId },
        returning: true,
    });
    return updatedCourse;
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
    return { count: count, courses: rows };
}

async function checkCourseId(courseId: number) {
    const user = await Courses.findByPk(courseId);
    if (user) {
        return true;
    }
    return false;
}

async function searchCourses(courseName: string) {
    const courses = await Courses.findAll({
        where: {
            courseName: {
                [Op.iLike]: `%${courseName}%`,
            },
        },
    });
    return courses;
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
};
