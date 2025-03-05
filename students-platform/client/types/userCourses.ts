import { Course } from "./course";
import { User } from "./user";

export interface UserCourse{
    course_id:number,
    student_id:number,
    user:User,
    course:Course
}