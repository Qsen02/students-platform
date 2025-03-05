import { Course } from "./course";
import { User } from "./user";

export interface UserCourse{
    course_id:number,
    user_id:number,
    UserId:number,
    CourseId:number,
    user:User,
    course:Course
}