import { UserForAuth } from "@/types/user";
import { getUserData } from "@/utils/userHelper";
import { useState } from "react";

export function usePressistedState(initialValues: UserForAuth | null) {
    const [user, setUser] = useState<UserForAuth | null>(() => {
            const user = getUserData("user");
            if (user) {
                return user;
            }

            return initialValues;
    });

    function setUserState(value:UserForAuth | null){
        setUser(value);
    }

    return {
        user,setUserState
    }
}
