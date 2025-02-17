export interface UserAttributes {
    id: number | undefined;
    fullname: string;
    course: number;
    role: "student" | "lector";
    facultyNumber: string;
}

export interface UserForAuth{
    id: number|undefined,
    fullname: string;
    course: number;
    role: "student" | "lector";
    facultyNumber: string;
    accessToken:string;
}
