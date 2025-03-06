import { Lection } from "@/types/lection";
import { useEffect, useState } from "react";
import { useErrorLoading } from "./useErrorLoading";
import { addLectionToCourse, deleteLection, getLectionById } from "@/api/lectionService";

export function useGetOneLection(initialValues: null, lectionId: number) {
    const [lection, setLection] = useState<Lection | null>(initialValues);
    const {loading,setLoading,error,setError}=useErrorLoading(false,false);

    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const lection=await getLectionById(lectionId);
                setLection(lection);
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError(true);
            }
        })()
    },[]);

    return {
        lection,loading,error
    }
}

export function useCreateLection(){
    async function creatingLection(courseId:number,data:object){
        return await addLectionToCourse(courseId,data);
    }

    return creatingLection;
}

export function useDeleteLection(){
    async function deletingLection(lectionId:number){
        return await deleteLection(lectionId);
    }

    return deletingLection
}
