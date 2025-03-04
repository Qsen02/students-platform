import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    getLatestCourses,
    searchCourses,
} from "@/api/courseService";
import { Lection } from "@/types/lection";
import { getAllLectionsForCourse } from "@/api/lectionService";

export function useGetLatestCourses(initialValues: []) {
    const [courses, setCourses] = useState<Course[]>(initialValues);
    const { loading, error, setLoading, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const courses = await getLatestCourses();
                setCourses(courses);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        courses,
        loading,
        error,
    };
}

export function useGetAllCourses(initialValues: []) {
    const [courses, setCourses] = useState<Course[]>(initialValues);
    const { loading, error, setLoading, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const courses = await getAllCourses();
                setCourses(courses);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        courses,
        setCourses,
        loading,
        setLoading,
        error,
        setError,
    };
}

export function useSearchCourses() {
    async function onSearching(query: string) {
        return await searchCourses(query);
    }

    return onSearching;
}

export function useCreateCourse() {
    async function creatingCourse(data: object) {
        return await createCourse(data);
    }

    return creatingCourse;
}

export function useGetOneCourse(
    initialCourse: null,
    initialLections: [],
    courseId: number
) {
    const [course, setCourse] = useState<Course | null>(initialCourse);
    const [lections,setLections]=useState<Lection[]>(initialLections);
    const {loading,setLoading,error,setError}=useErrorLoading(false,false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const course = await getCourseById(courseId);
                setCourse(course);
                const lections=await getAllLectionsForCourse(courseId);
                setLections(lections);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        course,lections,loading,error
    }
}
