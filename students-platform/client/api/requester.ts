import { getUserData, removeUserData } from "@/utils/userHelper";

const host = "http://localhost:3000";

async function request(method: string, url: string, data?: object) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const options: RequestInit = {
        method: method,
        headers: headers,
    };
    const user = await getUserData("user");
    if (user) {
        headers["X-Authorization"] = user.accessToken;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            const err = await res.json();
            if (res.status == 401 || res.status == 403) {
                await removeUserData("user");
            }
            throw new Error(err.message);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("Unknown error occurd");
        }
    }
}

export async function get(url: string) {
    return await request("get", `${host}/${url}`);
}

export async function post(url: string, data: object) {
    return await request("post", `${host}/${url}`, data);
}

export async function del(url: string) {
    return await request("delete", `${host}/${url}`);
}
export async function put(url: string, data: object) {
    return await request("put", `${host}/${url}`, data);
}
