import { useState } from "react";

export function useErrorLoading(loadingInit:boolean,errorInit:boolean){
    const [loading,setLoading]=useState(loadingInit);
    const [error,setError]=useState(errorInit);

    return {
        loading,error,setLoading,setError
    }
}