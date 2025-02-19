import { Router } from "express";
import { isUser } from "../middlewares/guard";
import { checkUserId } from "../services/user";
import {
    checkAssessmentId,
    createAssessment,
    getAssessmentById,
    getUserAssessments,
    updateAssessment,
} from "../services/assessment";
import { body, validationResult } from "express-validator";
import { checkCourseId } from "../services/course";
import { errorParser } from "../utils/errorParser";

const assessmentRouter = Router();

assessmentRouter.get("/for/:userId", isUser(), async (req, res) => {
    const userId = Number(req.params.userId);
    const isValid = await checkUserId(userId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const assessments = await getUserAssessments(userId);
    res.json(assessments);
});

assessmentRouter.get("/:assessmentId", async (req, res) => {
    const assessmentId = Number(req.params.assessmentId);
    const isValid = await checkAssessmentId(assessmentId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const assessment = await getAssessmentById(assessmentId);
    res.json(assessment);
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
        const assessment = req.body.assessment;
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
    "/:assessmentId",
    body("assessment")
        .isInt({ min: 2, max: 6 })
        .withMessage("Assessment must be between 2 and 6!"),
    isUser(),
    async (req, res) => {
        const assessmentId = Number(req.params.assessmentId);
        const fields = req.body;
        const isValid = await checkAssessmentId(assessmentId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const updatedAssessment=await updateAssessment(assessmentId,fields);
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
