import InputField from "@/commons/input-field/InputField";
import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "../register/RegisterStyles";

export default function LectionCreate() {
    const route = useRoute<RouteProp<Routes, "LectionCreate">>();
    const { courseId } = route.params;
    const [values, setValues] = useState({
        lectionName: "",
        content: "",
    });
    return (
        <SafeAreaView style={registerStyles.formWrapper}>
            <Text style={registerStyles.formTitle}>Create lection here</Text>
            <Text style={registerStyles.formText}>Lection name</Text>
            <InputField
                value={values.lectionName}
                title="Lection name"
                changeHandler={(e: string) =>
                    setValues({ ...values, lectionName: e })
                }
                keyboardType="default"
            />
            <Text style={registerStyles.formText}>Content</Text>
            <InputField
                value={values.content}
                title="Content"
                changeHandler={(e: string) =>
                    setValues({ ...values, content: e })
                }
                keyboardType="default"
                textarea={true}
            />
            <TouchableOpacity style={registerStyles.formButton}>
                <Text style={registerStyles.formButtonText}>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
