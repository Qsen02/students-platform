import { Course } from "./course";

export interface Lection {
    id: number;
    lectionName: string;
    content: string;
    course_id: Course;
}
