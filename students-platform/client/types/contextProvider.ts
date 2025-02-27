import { UserForAuth } from "./user";

export interface ContextProvider {
    user: UserForAuth | null;
    setCurUser: (value: UserForAuth | null) => void;
    removeCurUser: () => Promise<void>;
}
