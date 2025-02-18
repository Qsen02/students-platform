import { Courses } from "../models/course";
import { Users } from "../models/user";
import { Course } from "../types/courses";

async function getAllCourses() {
    const courses = await Courses.findAll();
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

async function createCourse(courseName: string, lectorId: number) {
    const newCourse = await Courses.create({
        courseName: courseName,
        lector_id: lectorId,
    });
    return newCourse;
}

async function deleteCourse(courseId: number) {
    await Courses.destroy({
        where: { id: courseId },
    });
}

async function updateCourse(courseId: number, data: Partial<Course>) {
    const updatedCourse = await Courses.update(data, {
        where: { id: courseId },
        returning: true,
    });
    return updatedCourse;
}

export {
    getCourseById,
    getAllCourses,
    deleteCourse,
    updateCourse,
    createCourse,
};
