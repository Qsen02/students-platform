import { UserForAuth } from "@/types/user";
import EncryptedStorage from "react-native-encrypted-storage";

export async function setUserData(key: string, data: UserForAuth) {
    try {
        await EncryptedStorage.setItem(key, JSON.stringify(data));
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
        const data = await EncryptedStorage.getItem(key);
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
       await EncryptedStorage.removeItem(key);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}
