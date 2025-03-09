import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "../register/RegisterStyles";
import { useLogin } from "@/hooks/useUsers";
import { useUserContext } from "@/context/userContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import ErrorModal from "@/commons/err-modal/ErrorModal";

export default function Login() {
    const [form, setForm] = useState({
        fullname: "",
        password: "",
    });

    const navigation = useNavigation<NavigationProp<Routes>>();
    const login = useLogin();
    const { setCurUser } = useUserContext();
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    async function onSubmit() {
        const errors: string[] = [];
        if (!form.fullname || !form.password) {
            errors.push("All fields required!");
        }
        if (
            form.fullname.length < 3 ||
            !/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(form.password)
        ) {
            errors.push("Full name or password don't match!");
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
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
            if(err instanceof Error){
                if(err.message=="Full name or password don't match!"){
                    setErrMessage([err.message]);
                }else{
                    setErrMessage(["Error occurd! Please try again later."]);
                }
            }
            setIsErr(true);
            return;
        }
    }

    return (
        <>
            {isErr ? (
                <ErrorModal
                    message={errMessage.join("\n")}
                    visible={isErr}
                    visibleHanlder={setIsErr}
                    messageHandler={setErrMessage}
                />
            ) : (
                ""
            )}
            <SafeAreaView style={registerStyles.formWrapper}>
                <Text style={registerStyles.formTitle}>You can login here</Text>
                <Text style={registerStyles.formText}>Full name</Text>
                <InputField
                    value={form.fullname}
                    changeHandler={(e: string) =>
                        setForm({ ...form, fullname: e })
                    }
                    keyboardType="default"
                    title="Full name"
                />
                <Text style={registerStyles.formText}>Password</Text>
                <InputField
                    value={form.password}
                    changeHandler={(e: string) =>
                        setForm({ ...form, password: e })
                    }
                    keyboardType="default"
                    title="Password"
                />
                <TouchableOpacity
                    style={registerStyles.formButton}
                    onPress={onSubmit}
                >
                    <Text style={registerStyles.formButtonText}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={registerStyles.link}>
                        You don't have account yet? Register here.
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}
