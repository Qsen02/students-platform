import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "./RegisterStyles";
import { useRegister } from "@/hooks/useUsers";
import { useUserContext } from "@/context/userContext";
import { NavigationProp,useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";

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

    async function onSubmit() {
        if (
            !form.course ||
            !form.facultyNumber ||
            !form.fullname ||
            !form.password ||
            !form.repass
        ) {
            Alert.alert("All fields required!");
        }

        if (form.fullname.length < 3) {
            Alert.alert("Full name must be at least 3 symbols long!");
        }

        if (Number(form.course) > 4 || Number(form.course) < 1) {
            Alert.alert("Course must be between 1 and 4!");
        }

        if (form.facultyNumber.length != 8) {
            Alert.alert("Faculty number must be exactly 8 digits!");
        }

        if (/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(form.password)) {
            Alert.alert(
                "Password must be at least 6 symbols\n\nwith at least 1 capital letter,\n\ndigit and sepcial symbol!"
            );
        }

        if (form.repass != form.password) {
            Alert.alert("Password must match!");
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
                Alert.alert(err.message);
            } else {
                Alert.alert("Error occurd! Please try again later.");
            }
        }
    }

    return (
        <SafeAreaView style={registerStyles.formWrapper}>
            <Text style={registerStyles.formTitle}>You can register here</Text>
            <Text style={registerStyles.formText}>Full name</Text>
            <InputField
                value={form.fullname}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType="default"
                title="Full name"
            />
            <Text style={registerStyles.formText}>Course</Text>
            <InputField
                value={form.course}
                changeHandler={(e: string) => setForm({ ...form, course: e })}
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
                changeHandler={(e: string) => setForm({ ...form, password: e })}
                keyboardType="default"
                title="Password"
            />
            <Text style={registerStyles.formText}>Repeat password</Text>
            <InputField
                value={form.repass}
                changeHandler={(e: string) => setForm({ ...form, repass: e })}
                keyboardType="default"
                title="Repeat password"
            />
            <TouchableOpacity
                style={registerStyles.formButton}
                onPress={onSubmit}
            >
                <Text style={registerStyles.formButtonText}>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
