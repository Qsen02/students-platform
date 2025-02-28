import { login, logout, register } from "@/api/userService";

export function useRegister(){
    async function onRegister(data:object){
        return await register(data);
    }

    return onRegister;
}

export function useLogin(){
    async function onLogin(data:object){
        return await login(data);
    }

    return onLogin;
}

export function useLogout(){
    async function onLogout(){
        return await logout();
    }

    return onLogout;
}