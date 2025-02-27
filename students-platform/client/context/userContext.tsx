import { logout } from "@/api/userService";
import { usePressistedState } from "@/hooks/usePressistedState";
import { ContextProvider } from "@/types/contextProvider";
import { UserForAuth } from "@/types/user";
import { removeUserData, setUserData } from "@/utils/userHelper";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<ContextProvider | null>(null);

export default function UserContextProvider(props: { children: ReactNode }) {
    const { user, setUserState } = usePressistedState(null);

    function setCurUser(user: UserForAuth | null) {
        setUserState(user);
        setUserData("user", user);
    }

    async function removeCurUser() {
        setUserState(null);
        await removeUserData("user");
        await logout();
    }

    return (
        <UserContext.Provider value={{ user, setCurUser, removeCurUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);

    return {
        user: context?.user,
        setCurUser: context?.setCurUser,
        removeCurUser: context?.removeCurUser,
    };
}
