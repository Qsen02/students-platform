import InputField from "@/commons/input-field/InputField";
import { Routes } from "@/types/navigation";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "../register/RegisterStyles";
import { useCreateLection } from "@/hooks/useLections";
import ErrorModal from "@/commons/err-modal/ErrorModal";

export default function LectionCreate() {
    const route = useRoute<RouteProp<Routes, "LectionCreate">>();
    const { courseId } = route.params;
    const [values, setValues] = useState({
        lectionName: "",
        content: "",
    });
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);
    const createLection = useCreateLection();
    const navigation = useNavigation<NavigationProp<Routes>>();

    async function onCreate() {
        const errors: string[] = [];

        if (!values.content || !values.lectionName) {
            errors.push("All fields required!");
        }

        if (values.lectionName.length < 3) {
            errors.push("Lection name must be at least 3 symbols long!");
        }

        if (values.content.length < 3) {
            errors.push("Content must be at least 3 symbols long!");
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
        }
        try {
            await createLection(courseId, {
                lectionName: values.lectionName,
                content: values.content,
            });
            navigation.navigate("CourseDetails", { courseId: courseId });
        } catch (err) {
            setErrMessage(["Error occurs! Please try again later!"]);
            setIsErr(true);
            return;
        }
    }

    return (
        <>
            <ErrorModal
                visible={isErr}
                message={errMessage.join("\n")}
                messageHandler={setErrMessage}
                visibleHanlder={setIsErr}
            />
            <SafeAreaView style={registerStyles.formWrapper}>
                <Text style={registerStyles.formTitle}>
                    Create lection here
                </Text>
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
                <TouchableOpacity
                    style={registerStyles.formButton}
                    onPress={onCreate}
                >
                    <Text style={registerStyles.formButtonText}>SUBMIT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}
