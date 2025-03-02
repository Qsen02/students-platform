import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import { getAllCourses, getLatestCourses } from "@/api/courseService";

export function useGetLatestCourses(initialValues:[]){
    const [courses,setCourses]=useState<Course[]>(initialValues);
    const {loading,error,setLoading,setError}=useErrorLoading(false,false);

    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const courses=await getLatestCourses();
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

export function useGetAllCourses(initialValues:[]){
    const [courses,setCourses]=useState<Course[]>(initialValues);
    const {loading,error,setLoading,setError}=useErrorLoading(false,false);

    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const courses=await getAllCourses();
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