import { User, UserForAuth } from "@/types/user";
import { get, post } from "./requester";

const endpoint="users";

export async function getUserById(userId:number){
    const user=await get(`${endpoint}/${userId}`);
    return user as User;
}

export async function register(data:object){
    const user=await post(`${endpoint}/register`,data);
    return user as UserForAuth;
}

export async function login(data:object){
    const user=await post(`${endpoint}/login`,data);
    return user as UserForAuth;
}

export async function logout(){
    await get(`${endpoint}/logout`);
}