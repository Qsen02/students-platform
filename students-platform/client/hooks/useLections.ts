import { Lection } from "@/types/lection";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import {
    addLectionToCourse,
    deleteLection,
    editLection,
    getLectionById,
} from "@/api/lectionService";

export function useGetOneLection(initialValues: null, lectionId: number) {
    const [lection, setLection] = useState<Lection | null>(initialValues);
    const { loading, setLoading, error, setError } = useErrorLoading(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const lection = await getLectionById(lectionId);
                setLection(lection);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    return {
        lection,
        setLection,
        loading,
        error,
    };
}

export function useCreateLection() {
    async function creatingLection(courseId: number, data: object) {
        return await addLectionToCourse(courseId, data);
    }

    return creatingLection;
}

export function useDeleteLection() {
    async function deletingLection(lectionId: number) {
        return await deleteLection(lectionId);
    }

    return deletingLection;
}

export function useEditLection() {
    async function editingLection(lectionId: number, data: object) {
        return await editLection(lectionId, data);
    }

    return editingLection;
}

export function useGetLectionForEditFrom(
    initialFormValues: { lectionName: string; content: string },
    lectionId: number | undefined,
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
                if (lectionId) {
                    const lection = await getLectionById(lectionId);
                    setValues({
                        lectionName: lection.lectionName,
                        content: lection.content,
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
