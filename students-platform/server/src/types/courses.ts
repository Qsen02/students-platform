import { UserAttributes } from "./users";

export interface Course{
    id: number | undefined,
    courseName:string,
    lector_id:UserAttributes,
}