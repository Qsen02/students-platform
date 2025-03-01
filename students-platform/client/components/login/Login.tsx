import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "../register/RegisterStyles";
import { useLogin, useRegister } from "@/hooks/useUsers";
import { useUserContext } from "@/context/userContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";

export default function Login() {
    const [form, setForm] = useState({
        fullname: "",
        password: "",
    });

    const navigation = useNavigation<NavigationProp<Routes>>();
    const login = useLogin();
    const { setCurUser } = useUserContext();

    async function onSubmit() {
        if (!form.fullname || !form.password) {
            Alert.alert("All fields required!");
        }

        if (form.fullname.length < 3) {
            Alert.alert("Full name must be at least 3 symbols long!");
        }

        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(form.password)) {
            Alert.alert(
                "Password must be at least 6 symbols\n\nwith at least 1 capital letter,\n\ndigit and sepcial symbol!"
            );
        }

        try {
            const user = await login({
                fullname: form.fullname,
                password: form.password,
            });
            if (setCurUser) {
                setCurUser(user);
            }
            navigation.navigate("Home");
        } catch (err) {
            if (err instanceof Error) {
                Alert.alert(err.message);
            } else {
                Alert.alert("Error occurd! Please try again later.");
            }
        }
    }

    return (
        <SafeAreaView style={registerStyles.formWrapper}>
            <Text style={registerStyles.formTitle}>You can login here</Text>
            <Text style={registerStyles.formText}>Full name</Text>
            <InputField
                value={form.fullname}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType="default"
                title="Full name"
            />
            <Text style={registerStyles.formText}>Password</Text>
            <InputField
                value={form.password}
                changeHandler={(e: string) => setForm({ ...form, password: e })}
                keyboardType="default"
                title="Password"
            />
            <TouchableOpacity
                style={registerStyles.formButton}
                onPress={onSubmit}
            >
                <Text style={registerStyles.formButtonText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                <Text style={registerStyles.link}>
                    You don't have account yet? Register here.
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
