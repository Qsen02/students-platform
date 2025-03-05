import { User, UserForAuth } from "@/types/user";
import { get, post } from "./requester";
import { UserCourse } from "@/types/userCourses";

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
    const user = await get(`${endpoint}/sign/${userId}/for/${courseId}`);
    return user as UserCourse | null;
}
