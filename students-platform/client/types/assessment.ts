import { Course } from "./course";
import { User } from "./user";

export interface Assessment {
    id: number ;
    course_id: Course;
    student_id: User;
    assessment: number;
}