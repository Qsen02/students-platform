import { Assessment } from "@/types/assessment";
import { get, post, put } from "./requester";

const endpoint = "assessments";

export async function getAssessmentById(assessmentId:number){
    const assessment = await get(`${endpoint}/${assessmentId}`);
    return assessment as Assessment;
}

export async function getUserCourseAssessment(userId:number,courseId:number){
    const assessments = await get(`${endpoint}/for/${userId}/in/${courseId}`);
    return assessments as Assessment | null;
}

export async function getStudentAssessments(userId:number){
    const assessments = await get(`${endpoint}/for/student/${userId}`);
    return assessments as Assessment[] | [];
}

export async function addAssessment(userId:number,courseId:number,data:object){
    const newAssessment = await post(`${endpoint}/for/${userId}/in/${courseId}`,data);
    return newAssessment as Assessment;
}

export async function editAssessment(userId:number,courseId:number,data:object){
    const updatedAssessment = await put(`${endpoint}/for/${userId}/in/${courseId}`,data);
    return updatedAssessment as Assessment;
}