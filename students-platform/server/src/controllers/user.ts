import { Request, Router } from "express";
import { checkUserId, getUserById, login, register } from "../services/user";
import { body, validationResult } from "express-validator";
import { setToken } from "../services/token";
import { isUser } from "../middlewares/guard";
import { errorParser } from "../utils/errorParser";

const userRouter = Router();

userRouter.get("/logout", isUser(),(req, res) => {
    res.status(200).json({message:"Logout was successfull!"});
});

userRouter.get("/:userId", async (req, res) => {
    const userId = Number(req.params.userId);
    const isValid = await checkUserId(userId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
    }
    const user = await getUserById(userId);
    res.json(user);
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
        .custom((value: string, { req }) => req.body.password == value).withMessage("Password must match!"),
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
        .withMessage("Full name must be at least 3 symbols long!"),
    body("password")
        .trim()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
        .withMessage(
            "Password must be at least 6 symbols with at least 1 capital letter, digit and sepcial symbol"
        ),
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

export { userRouter };
