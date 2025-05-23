import { Router } from "express";
import { isUser } from "../middlewares/guard";
import {
    checkCourseId,
    createCourse,
    deleteCourse,
    getAllCourses,
    getAllSignedStudentsForCourse,
    getCourseById,
    getLatestCourses,
    pagination,
    searchCourses,
    updateCourse,
} from "../services/course";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParser";
import { MyRequest } from "../types/express";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
    const courses = await getAllCourses();
    res.json(courses);
});

courseRouter.get("/latest", async (req, res) => {
    const courses = await getLatestCourses();
    res.json(courses);
});

courseRouter.get("/page/:pageNumber", async (req, res) => {
    const pageNumber = Number(req.params.pageNumber);
    const { courseCount, courses } = await pagination(pageNumber);
    const count=Math.floor(courseCount/6);
    res.json({ count, courses });
});

courseRouter.get("/search/:query", async (req, res) => {
    const query = req.params.query;
    const courses = await searchCourses(query);
    if (courses.length == 0) {
        res.status(404).json({ message: "No results found!" });
        return;
    }
    res.json(courses);
});

courseRouter.get("/users/:courseId", isUser(), async (req, res) => {
    const courseId = Number(req.params.courseId);
    const isValid = await checkCourseId(courseId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const users=await getAllSignedStudentsForCourse(courseId);
    res.json(users);
});

courseRouter.get("/:courseId", async (req, res) => {
    const courseId = Number(req.params.courseId);
    try {
        const course = await getCourseById(courseId);
        res.json(course);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurd!" });
        }
        return;
    }
});

courseRouter.post(
    "/",
    body("courseName")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Course name must be at least 3 symbols long!"),
    isUser(),
    async (req: MyRequest, res) => {
        const fields = req.body;
        const user = req.user;
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newCourse = await createCourse(
                fields.courseName,
                user?.id,
                fields.courseImage
            );
            res.json(newCourse);
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

courseRouter.delete("/:courseId", isUser(), async (req, res) => {
    const courseId = Number(req.params.courseId);
    const isValid = await checkCourseId(courseId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const deletedCount = await deleteCourse(courseId);
    res.json({ message: `${deletedCount} records was deleted successfully` });
});

courseRouter.put(
    "/:courseId",
    body("courseName")
        .isLength({ min: 3 })
        .withMessage("Course name must be at least 3 symbols long!"),
    isUser(),
    async (req, res) => {
        const fields = req.body;
        const courseId = Number(req.params.courseId);
        const isValid = await checkCourseId(courseId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const updatedCourse = await updateCourse(courseId, fields);
            res.json(updatedCourse);
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

export { courseRouter };
