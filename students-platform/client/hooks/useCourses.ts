import { Course } from "@/types/course";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import {
    createCourse,
    deleteCourse,
    editCourse,
    getAllCourses,
    getCourseById,
    getLatestCourses,
    searchCourses,
} from "@/api/courseService";
import { Lection } from "@/types/lection";
import { getAllLectionsForCourse } from "@/api/lectionService";
import { getSignForCourse } from "@/api/userService";
import { UserCourse } from "@/types/userCourses";

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
    courseId: number,
    userId: number | null | undefined
) {
    const [course, setCourse] = useState<Course | null>(initialCourse);
    const [lections, setLections] = useState<Lection[]>(initialLections);
    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const course = await getCourseById(courseId);
                setCourse(course);
                const lections = await getAllLectionsForCourse(courseId);
                let sign: UserCourse | null = null;
                if (userId) {
                    sign = await getSignForCourse(userId, courseId);
                }
                setIsSignUp(Boolean(sign));
                setLections(lections);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        course,
        setCourse,
        lections,
        loading,
        setLoading,
        error,
        isSignUp,
        setIsSignUp,
    };
}

export function useDeleteCourse(){
    async function deleting(courseId:number){
        return await deleteCourse(courseId);
    }

    return deleting;
}

export function useEditCourse(){
    async function editing(courseId:number,data:object){
        return await editCourse(courseId,data);
    }

    return editing;
}

export function useGetCourseForEditFrom(
    initialFormValues: { courseName: string; courseImage: string},
    courseId: number | undefined,
    isClicked:boolean
) {
    const [values, setValues] = useState(initialFormValues);

    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                if (courseId) {
                    const course = await getCourseById(courseId);
                    if(!course.courseImage){
                        course.courseImage="";
                    }
                    setValues({
                        courseName: course.courseName,
                        courseImage: course.courseImage,
                    });
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, [isClicked]);

    return {
        values,
        setValues,
        loading,
        error,
    };
}