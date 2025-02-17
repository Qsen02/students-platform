import { Users } from "../models/user";
import bcrypt from "bcrypt";

async function register(
    fullname: string,
    password: string,
    course: number,
    facultyNumber: string
) {
    const user = await Users.findOne({
        where: {
            fullname: fullname,
            course: course,
            facultyNumber: facultyNumber,
        },
    });
    if (user) {
        throw new Error("This user already exist!");
    }

    const newUser = await Users.create({
        fullname: fullname,
        course: course,
        facultyNumber: facultyNumber,
        role: "student",
        password: await bcrypt.hash(password, 10),
    });

    return newUser;
}

async function login(fullname: string, password: string) {
    const user = await Users.findOne({
        where: { fullname: fullname },
    });
    if (!user) {
        throw new Error("Full name or password don't match!");
    }
    const isValidPass = await bcrypt.compare(password,user.password);
    if (!isValidPass) {
        throw new Error("Full name or password don't match!");
    }

    return user;
}

async function getUserById(userId: number) {
    const user = await Users.findByPk(userId);
    return user;
}

async function checkUserId(userId: number) {
    const user = await Users.findByPk(userId);
    if (user) {
        return true;
    }
    return false;
}

export { register, login, checkUserId, getUserById };
