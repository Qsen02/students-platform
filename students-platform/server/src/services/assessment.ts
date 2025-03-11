import { Op } from "sequelize";
import { Assessments } from "../models/assessment";
import { Courses } from "../models/course";
import { Users } from "../models/user";

async function getAssessmentById(assessmentId: number) {
    const assessment = await Assessments.findByPk(assessmentId);

    if (!assessment) {
        throw new Error("Resource not found!");
    }

    return assessment;
}

async function createAssessment(
    assessmentNumber: number,
    userId: number,
    courseId: number
) {
    const isExist = await Assessments.findOne({
        where: {
            [Op.and]: [{ student_id: userId }, { course_id: courseId }],
        },
    });
    if (isExist) {
        throw new Error("This assessment already exist!");
    }
    const assessment = await Assessments.create({
        assessment: assessmentNumber,
        student_id: userId,
        course_id: courseId,
    });

    return assessment;
}

async function updateAssessment(
    userId: number,
    courseId: number,
    newAssessment: number
) {
    const assessment = await Assessments.update(
        { assessment: newAssessment },
        {
            where: {
                [Op.and]: [{ student_id: userId }, { course_id: courseId }],
            },
            returning: true,
        }
    );
    return assessment[1][0];
}

async function getUserCourseAssessment(userId: number, courseId: number) {
    const assessments = await Assessments.findOne({
        where: {
            [Op.and]: [{ student_id: userId }, { course_id: courseId }],
        },
        include: [
            { model: Users, as: "student" },
            { model: Courses, as: "course" },
        ],
    });
    return assessments;
}

async function getStudentAssessments(studentId: number) {
    const assessments = await Assessments.findAll({
        where: {
            student_id: studentId,
        },
        include: [
            { model: Users, as: "student" },
            { model: Courses, as: "course" },
        ],
    });
    return assessments;
}

async function checkAssessmentId(assessmentId: number) {
    const assessment = await Assessments.findByPk(assessmentId);
    if (assessment) {
        return true;
    }
    return false;
}

export {
    getAssessmentById,
    createAssessment,
    updateAssessment,
    getUserCourseAssessment,
    checkAssessmentId,
    getStudentAssessments,
};
