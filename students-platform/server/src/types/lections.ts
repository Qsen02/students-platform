import { Course } from "./courses";

export interface Lection{
    id:number | undefined,
    lectionName:string,
    content:string,
    course_id:Course
}