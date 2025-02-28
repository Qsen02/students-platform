import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "./RegisterStyles";

export default function Register() {
    const [form, setForm] = useState({
        fullname: "",
        course: "",
        facultyNumber: "",
        password: "",
        repass: "",
    });
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
            <TouchableOpacity style={registerStyles.formButton}>
                <Text style={registerStyles.formButtonText}>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
