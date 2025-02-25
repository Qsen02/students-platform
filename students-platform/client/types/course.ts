import { User } from "./user";

export interface Course{
    id: number,
    courseName:string,
    lector_id: User,
    courseImage:string | null
}