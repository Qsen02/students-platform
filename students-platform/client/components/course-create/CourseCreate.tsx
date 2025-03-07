import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "../register/RegisterStyles";
import { useState } from "react";
import InputField from "@/commons/input-field/InputField";
import { useCreateCourse } from "@/hooks/useCourses";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import ErrorModal from "@/commons/err-modal/ErrorModal";

export default function CourseCreate() {
    const [formValues, setFormValues] = useState({
        courseName: "",
        courseImage: "",
    });
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    const createCourse = useCreateCourse();
    const navigation = useNavigation<NavigationProp<Routes>>();

    async function onCreate() {
        const errors: string[] = [];
        if (!formValues.courseName) {
            errors.push("Course name is required!");
        }

        if (formValues.courseName.length < 3) {
            errors.push("Course name must be at least 3 symbols long!");
        }

        if (
            formValues.courseImage != "" &&
            !/^https?:\/\//.test(formValues.courseImage)
        ) {
            errors.push("Course image must be valid URL!");
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
        }

        try {
            await createCourse({
                courseName: formValues.courseName,
                courseImage: formValues.courseImage,
            });
            navigation.navigate("Courses");
        } catch (err) {
            setErrMessage(["Error occurd! Please try again later."]);
            setIsErr(true);
            return;
        }
    }

    return (
        <>
            <ErrorModal
                message={errMessage.join("\n")}
                visible={isErr}
                visibleHanlder={setIsErr}
                messageHandler={setErrMessage}
            />
            <SafeAreaView style={registerStyles.formWrapper}>
                <Text style={registerStyles.formTitle}>
                    Create new course here
                </Text>
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
                <Text style={registerStyles.formText}>
                    Course image (not required)
                </Text>
                <InputField
                    value={formValues.courseImage}
                    placeholder="http://ReactNative.com"
                    changeHandler={(e: string) =>
                        setFormValues({ ...formValues, courseImage: e })
                    }
                    keyboardType="default"
                    title="courseImage"
                />
                <TouchableOpacity
                    style={registerStyles.formButton}
                    onPress={onCreate}
                >
                    <Text style={registerStyles.formButtonText}>Submit</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}
