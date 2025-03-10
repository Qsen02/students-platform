import { Assessment } from "@/types/assessment";
import { useEffect, useState } from "react";
import { addAssessment, getUserAssessments } from "@/api/assessmentService";

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
        assessment,setAssessment,
    };
}

export function useSetAssessment(){
    async function setting(userId:number,courseId:number,data:object){
        return await addAssessment(userId,courseId,data);
    }

    return setting;
}
