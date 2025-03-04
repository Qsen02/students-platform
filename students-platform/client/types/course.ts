import { User } from "./user";

export interface Course{
    id: number;
    courseName:string;
    lector_id: number;
    courseImage:string | null;
    createdAt: string;
    updatedAt: string;
    lector:User
}