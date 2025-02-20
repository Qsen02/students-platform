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
    const assessment = await Assessments.create({
        assessment: assessmentNumber,
        student_id: userId,
        course_id: courseId,
    });

    return assessment;
}

async function updateAssessment(
    assessmentId: number,
    data: Partial<Assessments>
) {
    const assessment = await Assessments.update(data, {
        where: { id: assessmentId },
        returning: true,
    });
    return assessment[1][0];
}

async function getUserAssessments(userId: number) {
    const assessments = await Assessments.findAll({
        where: { student_id: userId },
        include: [{ model: Users }, { model: Courses }],
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
    getUserAssessments,
    checkAssessmentId,
};
