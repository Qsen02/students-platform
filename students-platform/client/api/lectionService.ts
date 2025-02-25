import { Lection } from "@/types/lection";
import { del, get, post, put } from "./requester";

const endpoint="lections";

export async function getLectionById(lectionId:number){
    const lection = await get(`${endpoint}/${lectionId}`);
    return lection as Lection;
}

export async function getAllLectionsForCourse(courseId:number){
    const lections = await get(`${endpoint}/in/${courseId}`);
    return lections as Lection[] | [];
}

export async function addLectionToCourse(courseId:number,data:object){
    const newLection = await post(`${endpoint}/in/${courseId}`,data);
    return newLection as Lection;
}

export async function deleteLection(lectionId:number){
    await del(`${endpoint}/${lectionId}`);
}

export async function editLection(lectionId:number,data:object){
    const updatedLection = await put(`${endpoint}/${lectionId}`,data);
    return updatedLection as Lection;
}