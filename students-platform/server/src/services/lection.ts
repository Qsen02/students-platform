import { Lections } from "../models/lection";
import { Lection } from "../types/lections";

async function getLectionById(lectionId: number) {
    const lection = await Lections.findByPk(lectionId);
    return lection;
}

async function createLection(name: string, content: string, courseId: number) {
    const newLection = await Lections.create({
        lectionName: name,
        content: content,
        course_id: courseId,
    });
    return newLection;
}

async function deleteLection(lectionId: number) {
    const count=await Lections.destroy({
        where: { id: lectionId },
    });
    return count;
}

async function updateLection(lectionId: number, data: Partial<Lection>) {
    const newLection = await Lections.update(data, {
        where: { id: lectionId },
        returning: true,
    });
    return newLection[1][0];
}

async function getAllLectionsForCourse(courseId: number) {
    const lections = await Lections.findAll({
        where: { course_id: courseId },
    });
    return lections;
}

async function checkLectionId(lectionId: number) {
    const lection = await Lections.findByPk(lectionId);
    if (lection) {
        return true;
    }
    return false;
}

export {
    createLection,
    deleteLection,
    updateLection,
    getAllLectionsForCourse,
    checkLectionId,
    getLectionById
};
