import { Router } from "express";
import {
    changePassword,
    checkUserId,
    editUser,
    getAllCreatedCoursesForLector,
    getAllSignedCoursesForUser,
    getSignById,
    getUserById,
    login,
    register,
    signUpForCourse,
} from "../services/user";
import { body, validationResult } from "express-validator";
import { setToken } from "../services/token";
import { isUser } from "../middlewares/guard";
import { errorParser } from "../utils/errorParser";
import { checkCourseId } from "../services/course";

const userRouter = Router();

userRouter.get("/logout", isUser(), (req, res) => {
    res.status(200).json({ message: "Logout was successfull!" });
});

userRouter.get("/:userId", async (req, res) => {
    const userId = Number(req.params.userId);
    try {
        const user = await getUserById(userId);
        res.json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurd!" });
        }
        return;
    }
});

userRouter.post(
    "/register",
    body("fullname")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 symbols long!"),
    body("password")
        .trim()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
        .withMessage(
            "Password must be at least 6 symbols with at least 1 capital letter, digit and sepcial symbol"
        ),
    body("repass")
        .trim()
        .custom((value: string, { req }) => req.body.password == value)
        .withMessage("Password must match!"),
    body("course")
        .isInt({ min: 1, max: 4 })
        .withMessage("Course must be between 1 and 4"),
    body("facultyNumber")
        .trim()
        .isLength({ min: 8, max: 8 })
        .withMessage("Faculty number must be exactly 8 digits"),
    async (req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newUser = await register(
                fields.fullname,
                fields.password,
                fields.course,
                fields.facultyNumber
            );
            const token = setToken(newUser);
            res.json({
                id: newUser.id,
                fullname: newUser.fullname,
                course: newUser.course,
                facultyNumber: newUser.facultyNumber,
                role: newUser.role,
                accessToken: token,
            });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
);

userRouter.post(
    "/login",
    body("fullname")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Full name or password don't match!"),
    body("password")
        .trim()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
        .withMessage("Full name or password don't match!"),
    async (req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newUser = await login(fields.fullname, fields.password);
            const token = setToken(newUser);
            res.json({
                id: newUser.id,
                fullname: newUser.fullname,
                course: newUser.course,
                facultyNumber: newUser.facultyNumber,
                role: newUser.role,
                accessToken: token,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(400).json({
                    message: "Your data is not in valid format!",
                });
            }
        }
    }
);

userRouter.post("/sign/:userId/for/:courseId", isUser(), async (req, res) => {
    const userId = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    const isValidUser = await checkUserId(userId);
    const isValidCourse = await checkCourseId(courseId);
    if (!isValidCourse || !isValidUser) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const newSignUser = await signUpForCourse(userId, courseId);
    res.json(newSignUser);
});

userRouter.get("/sign/:userId/for/:courseId", async (req, res) => {
    const userId = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    const sign = await getSignById(userId, courseId);
    res.json(sign);
});

userRouter.get(
    "/all-signed-courses-for/:userId",
    isUser(),
    async (req, res) => {
        const userId = Number(req.params.userId);
        const isValid = await checkUserId(userId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        const courses = await getAllSignedCoursesForUser(userId);
        res.json(courses);
    }
);
userRouter.get(
    "/all-created-courses-for/:userId",
    isUser(),
    async (req, res) => {
        const userId = Number(req.params.userId);
        const isValid = await checkUserId(userId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        const courses = await getAllCreatedCoursesForLector(userId);
        res.json(courses);
    }
);

userRouter.put(
    "/:userId/edit",
    body("fullname")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 symbols long!"),
    isUser(),
    async (req, res) => {
        try {
            const userId = Number(req.params.userId);
            const fields = req.body;
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const updatedUser = await editUser(userId, fields);
            res.json(updatedUser);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(400).json({
                    message: "Your data is not in valid format!",
                });
            }
        }
    }
);

userRouter.put(
    "/:userId/change-password",
    body("password")
        .trim()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
        .withMessage(
            "Password must be at least 6 symbols with at least 1 capital letter, digit and sepcial symbol"
        ),
    isUser(),
    async (req, res) => {
        try {
            const userId = Number(req.params.userId);
            const fields = req.body;
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const updatedUser = await changePassword(userId, fields.password);
            res.json(updatedUser);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(400).json({
                    message: "Your data is not in valid format!",
                });
            }
        }
    }
);

export { userRouter };
