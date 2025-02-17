import { Course } from "./courses";
import { UserAttributes } from "./users";

export interface Grade {
    id: number | undefined;
    course_id: Course;
    student_id: UserAttributes;
    grade: number;
}
