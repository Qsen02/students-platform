import { Assessment } from "@/types/assessment";
import { useEffect, useState } from "react";
import { getUserAssessments } from "@/api/assessmentService";

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
            const curAssessment = await getUserAssessments(userId, courseId);
            setAssessment(curAssessment);
        })();
    }, []);

    return {
        assessment,
    };
}
