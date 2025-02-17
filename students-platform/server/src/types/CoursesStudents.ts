import { Course } from "./courses";
import { UserAttributes } from "./users";

export interface CoursesStudents {
    course_id:Course;
    user_id:UserAttributes;
}