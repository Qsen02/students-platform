import { User, UserForAuth } from "@/types/user";
import { get, post, put } from "./requester";
import { UserCourse } from "@/types/userCourses";
import { Course } from "@/types/course";

const endpoint = "users";

export async function getUserById(userId: number) {
    const user = await get(`${endpoint}/${userId}`);
    return user as User;
}

export async function register(data: object) {
    const user = await post(`${endpoint}/register`, data);
    return user as UserForAuth;
}

export async function login(data: object) {
    const user = await post(`${endpoint}/login`, data);
    return user as UserForAuth;
}

export async function logout() {
    await get(`${endpoint}/logout`);
}

export async function signForCourse(userId: number, courseId: number) {
    const user = await post(`${endpoint}/sign/${userId}/for/${courseId}`, {});
    return user as UserCourse;
}

export async function getSignForCourse(userId: number, courseId: number) {
    const userCourse = await get(`${endpoint}/sign/${userId}/for/${courseId}`);
    return userCourse as UserCourse | null;
}

export async function getAllSignedCoursesForUser(userId:number){
    const courses=await get(`${endpoint}/all-signed-courses-for/${userId}`);
    return courses as UserCourse[];
}

export async function getAllCreatedCoursesForLector(userId:number){
    const courses=await get(`${endpoint}/all-created-courses-for/${userId}`);
    return courses as Course[];
}

export async function editUser(userId:number,data:object){
    const updatedUser=await put(`${endpoint}/${userId}/edit`,data);
    return updatedUser as User;
}

export async function changePassword(userId:number,data:object){
    const updatedUser=await put(`${endpoint}/${userId}/change-password`,data);
    return updatedUser as User;
}
