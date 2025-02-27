import { UserForAuth } from "@/types/user";
import * as ExpoStore from "expo-secure-store"

export function setUserData(key: string, data: UserForAuth | null) {
    try {
        ExpoStore.setItem(key, JSON.stringify(data));
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}

export function getUserData(key: string): UserForAuth | null {
    try {
        const data = ExpoStore.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}

export async function removeUserData(key:string){
    try {
       ExpoStore.deleteItemAsync(key);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}
