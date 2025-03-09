import {
    editUser,
    getAllCreatedCoursesForLector,
    getAllSignedCoursesForUser,
    getUserById,
    login,
    logout,
    register,
    signForCourse,
} from "@/api/userService";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import { UserCourse } from "@/types/userCourses";
import { Course } from "@/types/course";

export function useRegister() {
    async function onRegister(data: object) {
        return await register(data);
    }

    return onRegister;
}

export function useLogin() {
    async function onLogin(data: object) {
        return await login(data);
    }

    return onLogin;
}

export function useLogout() {
    async function onLogout() {
        return await logout();
    }

    return onLogout;
}

export function useSignForCourse() {
    async function signing(userId: number, courseId: number) {
        return await signForCourse(userId, courseId);
    }

    return signing;
}

export function useGetUser(
    initalUserValues: null,
    userId: number,
    initialSignedCourses: [],
    initialCreatedCourses: [],
    isEditClicked: boolean
) {
    const [user, setUser] = useState<User | null>(initalUserValues);
    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );
    const [signedCourse, setSignedCourses] =
        useState<UserCourse[]>(initialSignedCourses);
    const [createdCourses, setCreatedCourses] = useState<Course[]>(
        initialCreatedCourses
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const curUser = await getUserById(userId);
                setUser(curUser);
                if (curUser.role == "lector") {
                    const createdCourses = await getAllCreatedCoursesForLector(
                        userId
                    );
                    setCreatedCourses(createdCourses);
                } else {
                    const signedCourses = await getAllSignedCoursesForUser(
                        userId
                    );
                    setSignedCourses(signedCourses);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
                return;
            }
        })();
    }, [isEditClicked]);

    return {
        user,
        setUser,
        createdCourses,
        signedCourse,
        loading,
        error,
    };
}

export function useGetUserValues(
    userId: number | undefined,
    isEditClicked: boolean
) {
    const [values, setValues] = useState({
        fullname: "",
    });
    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                if (userId) {
                    const curUser = await getUserById(userId);
                    setValues({ fullname: curUser.fullname });
                    setLoading(false);
                } else {
                    setLoading(false);
                    return;
                }
            } catch (err) {
                setLoading(false);
                setError(true);
                return;
            }
        })();
    }, [isEditClicked]);

    return {
        values,
        setValues,
        loading,
        error,
    };
}

export function useEditUser() {
    async function editing(userId: number, data: object) {
        return await editUser(userId, data);
    }

    return editing;
}
