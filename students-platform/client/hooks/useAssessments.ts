import { Assessment } from "@/types/assessment";
import { useEffect, useState } from "react";
import {
    addAssessment,
    editAssessment,
    getStudentAssessments,
    getUserCourseAssessment,
} from "@/api/assessmentService";
import { useErrorLoading } from "./useErrorLoading";
import { getUserById } from "@/api/userService";

export function useGetAssessment(
    initalValues: null,
    userId: number,
    courseId: number
) {
    const [assessment, setAssessment] = useState<Assessment | null>(
        initalValues
    );
    useEffect(() => {
        (async () => {
            const curAssessment = await getUserCourseAssessment(
                userId,
                courseId
            );
            setAssessment(curAssessment);
        })();
    }, []);

    return {
        assessment,
        setAssessment,
    };
}

export function useSetAssessment() {
    async function setting(userId: number, courseId: number, data: object) {
        return await addAssessment(userId, courseId, data);
    }

    return setting;
}

export function useGetAssessmentValue(
    userId: number | null,
    courseId: number | null
) {
    const [values, setValues] = useState({
        assessment: "",
    });
    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                if (userId && courseId) {
                    const assessment = await getUserCourseAssessment(
                        userId,
                        courseId
                    );
                    if (assessment?.assessment) {
                        setValues({
                            ...values,
                            assessment: assessment.assessment.toString(),
                        });
                    }
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        values,
        setValues,
        loading,
        error,
    };
}

export function useEditAssessment() {
    async function editing(userId: number, courseId: number, data: object) {
        return await editAssessment(userId, courseId, data);
    }

    return editing;
}

export function useGetAssessmentsByStudent(
    initalValues: [],
    studentId: number
) {
    const [assessments, setAssessments] = useState<Assessment[]>(initalValues);
    const [studentName, setStudentName] = useState("");
    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const curAssessments = await getStudentAssessments(studentId);
                setAssessments(curAssessments);
                const student = await getUserById(studentId);
                if (student?.fullname) {
                    setStudentName(student.fullname);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        assessments,
        studentName,
        loading,
        error,
    };
}
