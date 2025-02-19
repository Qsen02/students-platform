import { Assessments } from "../models/assessment";

async function getAssessmentById(assessmentId: number) {
    const grade = await Assessments.findByPk(assessmentId);
    return grade;
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
    const count = await Assessments.update(data, {
        where: { id: assessmentId },
    });
    return count[0];
}

async function getUserAssessments(userId: number) {
    const assessments = await Assessments.findAll({
        where: { student_id: userId },
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
