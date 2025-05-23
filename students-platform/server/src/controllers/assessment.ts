import { Router } from "express";
import { isUser } from "../middlewares/guard";
import { checkUserId } from "../services/user";
import {
    createAssessment,
    getAssessmentById,
    getStudentAssessments,
    getUserCourseAssessment,
    updateAssessment,
} from "../services/assessment";
import { body, validationResult } from "express-validator";
import { checkCourseId } from "../services/course";
import { errorParser } from "../utils/errorParser";

const assessmentRouter = Router();

assessmentRouter.get("/for/student/:userId",async(req,res)=>{
    const userId=Number(req.params.userId);
    const isValid=await checkUserId(userId);
    if(!isValid){
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const assessements=await getStudentAssessments(userId);
    res.json(assessements);
})

assessmentRouter.get("/for/:userId/in/:courseId", isUser(), async (req, res) => {
    const userId = Number(req.params.userId);
    const courseId=Number(req.params.courseId);
    const isValidCourse=await checkCourseId(courseId);
    const isValidUser = await checkUserId(userId);
    if (!isValidUser || !isValidCourse) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const assessments = await getUserCourseAssessment(userId,courseId);
    res.json(assessments);
});

assessmentRouter.get("/:assessmentId", async (req, res) => {
    const assessmentId = Number(req.params.assessmentId);
    try {
        const assessment = await getAssessmentById(assessmentId);
        res.json(assessment);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurd!" });
        }
        return;
    }
});

assessmentRouter.post(
    "/for/:userId/in/:courseId",
    body("assessment")
        .isInt({ min: 2, max: 6 })
        .withMessage("Assessment must be between 2 and 6!"),
    isUser(),
    async (req, res) => {
        const userId = Number(req.params.userId);
        const isValidUser = await checkUserId(userId);
        const assessment = Number(req.body.assessment);
        const courseId = Number(req.params.courseId);
        const isValidCourse = await checkCourseId(courseId);
        if (!isValidCourse || !isValidUser) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newAssessment = await createAssessment(
                assessment,
                userId,
                courseId
            );
            res.json(newAssessment);
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

assessmentRouter.put(
    "/for/:userId/in/:courseId",
    body("assessment")
        .isInt({ min: 2, max: 6 })
        .withMessage("Assessment must be between 2 and 6!"),
    isUser(),
    async (req, res) => {
        const userId = Number(req.params.userId);
        const isValidUser = await checkUserId(userId);
        const assessment = Number(req.body.assessment);
        const courseId = Number(req.params.courseId);
        const isValidCourse = await checkCourseId(courseId);
        if (!isValidCourse || !isValidUser) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const updatedAssessment = await updateAssessment(
                userId,
                courseId,
                assessment
            );
            res.json(updatedAssessment);
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

export { assessmentRouter };
