import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
    const [form, setForm] = useState({
        fullname: "",
        course: "",
        facultyNumber: "",
        password: "",
        repass: "",
    });
    return (
        <SafeAreaView>
            <Text>You can register here.</Text>
            <InputField
                value={form.fullname}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType="default"
            />
             <InputField
                value={form.course}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType="numeric"
            />
             <InputField
                value={form.facultyNumber}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType="decimal-pad"
            />
             <InputField
                value={form.password}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType='default'
            />
             <InputField
                value={form.repass}
                changeHandler={(e: string) => setForm({ ...form, fullname: e })}
                keyboardType="default"
            />
          <Button title="Submit"/>
        </SafeAreaView>
    );
}
