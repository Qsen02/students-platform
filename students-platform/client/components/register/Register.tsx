import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "./RegisterStyles";
import { useRegister } from "@/hooks/useUsers";
import { useUserContext } from "@/context/userContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import ErrorModal from "@/commons/err-modal/ErrorModal";

export default function Register() {
    const [form, setForm] = useState({
        fullname: "",
        course: "",
        facultyNumber: "",
        password: "",
        repass: "",
    });

    const navigation = useNavigation<NavigationProp<Routes>>();
    const register = useRegister();
    const { setCurUser } = useUserContext();
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    async function onSubmit() {
        const errors:string[]=[]
        if (
            !form.course ||
            !form.facultyNumber ||
            !form.fullname ||
            !form.password ||
            !form.repass
        ) {
            errors.push("All fields required!");
        }

        if (form.fullname.length < 3) {
            errors.push("Full name must be at least 3 symbols long!")
        }

        if (Number(form.course) > 4 || Number(form.course) < 1) {
            errors.push("Course must be between 1 and 4!")
        }

        if (form.facultyNumber.length != 8) {
            errors.push("Faculty number must be exactly 8 digits!")
        }

        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(form.password)) {
                errors.push("Password must be at least 6 symbols with at least 1 capital letter, digit and sepcial symbol!")
        }

        if (form.repass != form.password) {
           errors.push("Password must match!");
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
        }

        try {
            const user = await register({
                course: form.course,
                fullname: form.fullname,
                facultyNumber: form.facultyNumber,
                password: form.password,
                repass: form.repass,
            });
            if (setCurUser) {
                setCurUser(user);
            }
            navigation.navigate("Home");
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage([err.message]);
            } else {
                setErrMessage(["Error occurd! Please try again later!"]);
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
                <Text style={registerStyles.formTitle}>
                    You can register here
                </Text>
                <Text style={registerStyles.formText}>Full name</Text>
                <InputField
                    value={form.fullname}
                    changeHandler={(e: string) =>
                        setForm({ ...form, fullname: e })
                    }
                    keyboardType="default"
                    title="Full name"
                />
                <Text style={registerStyles.formText}>Course</Text>
                <InputField
                    value={form.course}
                    changeHandler={(e: string) =>
                        setForm({ ...form, course: e })
                    }
                    keyboardType="numeric"
                    title="Course"
                />
                <Text style={registerStyles.formText}>Faculty number</Text>
                <InputField
                    value={form.facultyNumber}
                    changeHandler={(e: string) =>
                        setForm({ ...form, facultyNumber: e })
                    }
                    keyboardType="decimal-pad"
                    title="Faculty number"
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
                <Text style={registerStyles.formText}>Repeat password</Text>
                <InputField
                    value={form.repass}
                    changeHandler={(e: string) =>
                        setForm({ ...form, repass: e })
                    }
                    keyboardType="default"
                    title="Repeat password"
                />
                <TouchableOpacity
                    style={registerStyles.formButton}
                    onPress={onSubmit}
                >
                    <Text style={registerStyles.formButtonText}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={registerStyles.link}>
                        Already have account? Login here.
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}
