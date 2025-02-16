import { Course } from "./courses";
import { Grade } from "./grades";

export interface User{
    fullname:string,
    course:number,
    courses:Course[],
    isLector:boolean,
    grades:Grade[],
    facultyNumber:string
}