import { Course } from "@/types/course";
import { del, get, post, put } from "./requester";
import { UserCourse } from "@/types/userCourses";

const endpoint="courses";

export async function getAllCourses(){
    const courses = await get(`${endpoint}`);
    return courses as Course[];
}

export async function getLatestCourses(){
    const courses = await get(`${endpoint}/latest`);
    return courses as Course[];
}

export async function getCourseById(courseId:number){
    const course = await get(`${endpoint}/${courseId}`);
    return course as Course;
}

export async function pagination(page:number){
    const courses = await get(`${endpoint}/page/${page}`);
    return courses as Course[];
}

export async function searchCourses(query:string){
    const courses = await get(`${endpoint}/search/${query}`);
    return courses as Course[] | [];
}

export async function createCourse(data:object){
    const newCourse = await post(`${endpoint}`,data);
    return newCourse as Course;
}

export async function deleteCourse(courseId:number){
    await del(`${endpoint}/${courseId}`);
}

export async function editCourse(courseId:number,data:object){
    const updatedCourse = await put(`${endpoint}/${courseId}`,data);
    return updatedCourse as Course;
}

export async function getAllSignedStudentsForCourse(courseId:number){
    const users=await get(`${endpoint}/users/${courseId}`);
    return users as UserCourse[] | [];
}