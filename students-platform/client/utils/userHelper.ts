import { UserForAuth } from "@/types/user";
import ExpoStore from "expo-secure-store"

export async function setUserData(key: string, data: UserForAuth) {
    try {
        await ExpoStore.setItemAsync(key, JSON.stringify(data));
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}

export async function getUserData(key: string): Promise<UserForAuth | null> {
    try {
        const data = await ExpoStore.getItemAsync(key);
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
       await ExpoStore.deleteItemAsync(key);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}
