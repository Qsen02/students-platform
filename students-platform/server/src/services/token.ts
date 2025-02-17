import { UserAttributes } from "../types/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function setToken(user: UserAttributes) {
    const payload = {
        id: user.id,
        fullname: user.fullname,
        course: user.course,
        role: user.role,
        facultyNumber: user.facultyNumber,
    };

    const token = jwt.sign(payload, process.env.SECRET!, { expiresIn: "3d" });

    return token;
}

function verifyToken(token:string){
    const isValid=jwt.verify(token,process.env.SECRET!) as UserAttributes;

    return isValid;
}

export {
    setToken,verifyToken
}
