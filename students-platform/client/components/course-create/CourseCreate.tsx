import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "../register/RegisterStyles";
import { useState } from "react";
import InputField from "@/commons/input-field/InputField";

export default function CourseCreate() {
    const [formValues, setFormValues] = useState({
        courseName: "",
        courseImage: "",
    });
    return (
        <SafeAreaView style={registerStyles.formWrapper}>
            <Text style={registerStyles.formTitle}>Create new course here</Text>
            <Text style={registerStyles.formText}>Course name</Text>
            <InputField
                value={formValues.courseName}
                placeholder="React Native"
                changeHandler={(e: string) =>
                    setFormValues({ ...formValues, courseName: e })
                }
                keyboardType="default"
                title="courseName"
            />
            <Text style={registerStyles.formText}>Course image</Text>
            <InputField
                value={formValues.courseImage}
                placeholder="http://ReactNative.com"
                changeHandler={(e: string) =>
                    setFormValues({ ...formValues, courseImage: e })
                }
                keyboardType="default"
                title="courseImage"
            />
            <TouchableOpacity style={registerStyles.formButton}>
                <Text style={registerStyles.formButtonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
