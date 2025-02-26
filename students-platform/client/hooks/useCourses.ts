import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import { getLatestCourses } from "@/api/courseService";

export function useGetLatestCourses(initialValues:[]){
    const [courses,setCourses]=useState<Course[]>(initialValues);
    const {loading,error,setLoading,setError}=useErrorLoading(false,false);

    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const courses=await getLatestCourses();
                console.log(courses);
                setCourses(courses);
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError(true);
            }
        })()
    },[])

    return {
        courses,loading,error
    }
}