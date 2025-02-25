export interface User {
    id:number,
    fullname: string;
    password: string;
    course: number;
    role: "student" | "lector";
    facultyNumber: string;
}

export interface UserForAuth{
    id: number ;
    fullname: string;
    course: number;
    role: "student" | "lector";
    facultyNumber: string;
    accessToken: string;
}