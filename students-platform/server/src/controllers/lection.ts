import { Router } from "express";
import { checkCourseId } from "../services/course";
import {
    checkLectionId,
    createLection,
    deleteLection,
    getAllLectionsForCourse,
    getLectionById,
    updateLection,
} from "../services/lection";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParser";

const lectionRouter = Router();

lectionRouter.get("/in/:courseId", async (req, res) => {
    const courseId = Number(req.params.courseId);
    const isValid = await checkCourseId(courseId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const lections = await getAllLectionsForCourse(courseId);
    res.json(lections);
});

lectionRouter.get("/:lectionId", isUser(), async (req, res) => {
    const lectionId = Number(req.params.lectionId);
    const isValid = await checkLectionId(lectionId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const lection = await getLectionById(lectionId);
    res.json(lection);
});

lectionRouter.post(
    "/in/:courseId",
    body("lectionName")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Lection name must be at least 3 symbols long!"),
    body("content")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Content must be at least 3 symbols long!"),
    isUser(),
    async (req, res) => {
        const courseId = Number(req.params.courseId);
        const isValid = await checkCourseId(courseId);
        const fields = req.body;
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newLection = await createLection(
                fields.lectionName,
                fields.content,
                courseId
            );
            res.json(newLection);
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

lectionRouter.delete("/:lectionId",isUser(),async(req,res)=>{
    const lectionId = Number(req.params.lectionId);
    const isValid = await checkLectionId(lectionId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
   const count= await deleteLection(lectionId);
    res.status(200).json({message:`${count} records was deleted successfully`});
})

lectionRouter.put(
    "/:lectionId",
    body("lectionName")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Lection name must be at least 3 symbols long!"),
    body("content")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Content must be at least 3 symbols long!"),
    isUser(),
    async (req, res) => {
        const lectionId = Number(req.params.lectionId);
        const isValid = await checkLectionId(lectionId);
        const fields = req.body;
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
           const updatedLection=await updateLection(lectionId,fields);
           res.json(updatedLection);
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

export { lectionRouter };
