import { Course } from "./course";
import { User } from "./user";

export interface Assessment {
    id: number ;
    course_id: number;
    student_id: number;
    assessment: number;
    course:Course,
    student:User
}