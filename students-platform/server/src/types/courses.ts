import { Lection } from "./lections";
import { User } from "./users";

export interface Course{
    courseName:string,
    students:User[],
    lector:User,
    lections:Lection[],
}