import ErrorModal from "@/commons/err-modal/ErrorModal";
import InputField from "@/commons/input-field/InputField";
import { homeStyles } from "@/components/home/HomeStyles";
import { lectionEditStyles } from "@/components/lection-details/lection-edit/LectionEditStyles";
import { registerStyles } from "@/components/register/RegisterStyles";
import { useSetAssessment } from "@/hooks/useAssessments";
import { useGetUserById } from "@/hooks/useUsers";
import { Assessment } from "@/types/assessment";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";

interface setAssessmentProps {
    isClicked: boolean;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number | null;
    courseId: number | null;
    setAssessmentHandler:React.Dispatch<React.SetStateAction<Assessment|null>>;
}

export default function SetAssessment({
    isClicked,
    clickHandler,
    userId,
    courseId,
    setAssessmentHandler
}: setAssessmentProps) {
    const [values, setValues] = useState({
        assessment: "",
    });
    const { user, loading, error } = useGetUserById(null, userId);
    const addAssessment = useSetAssessment();
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    function onCancel() {
        clickHandler(false);
    }

    async function onSet() {
        const errors: string[] = [];
        if (!values.assessment) {
            errors.push("Field is required!");
        }

        if (Number(values.assessment) < 2 || Number(values.assessment) > 6) {
            errors.push("Mark must be between 2 and 6!");
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
        }

        try {
            if (courseId && userId) {
                const assessment= await addAssessment(userId, courseId, {
                    assessment: values.assessment,
                });
                setAssessmentHandler(assessment);
                clickHandler(false);         
            } else {
                clickHandler(false);
            }
        } catch (err) {
            if (err instanceof Error) {
                if (err.message == "This assessment already exist!") {
                    setErrMessage([err.message]);
                } else {
                    setErrMessage([
                        "Something went wrong, please try again later!",
                    ]);
                }
            }
            setIsErr(true);
            return;
        }
    }

    return (
        <>
            <Spinner
                visible={loading}
                animation="fade"
                size="large"
                color="rgb(0, 157, 255)"
            />
            <ErrorModal
                message={errMessage.join("\n")}
                visible={isErr}
                visibleHanlder={setIsErr}
                messageHandler={setErrMessage}
            />
            <Modal transparent={true} visible={isClicked} animationType="fade">
                <View style={lectionEditStyles.overlay}>
                    <SafeAreaView style={registerStyles.formWrapper}>
                        {error ? (
                            <View style={homeStyles.error}>
                                <Text style={homeStyles.errorText}>
                                    Server is not responding, please try again
                                    later!
                                </Text>
                            </View>
                        ) : (
                            <>
                                <Text style={registerStyles.formTitle}>
                                    Set mark for student {user?.fullname} here.
                                </Text>
                                <Text style={registerStyles.formText}>
                                    Mark number
                                </Text>
                                <InputField
                                    value={values.assessment}
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, assessment: e })
                                    }
                                    keyboardType="numeric"
                                    title="Matk number"
                                />
                                <View style={lectionEditStyles.buttonWrapper}>
                                    <TouchableOpacity
                                        style={lectionEditStyles.button}
                                        onPress={onSet}
                                    >
                                        <Text
                                            style={lectionEditStyles.buttonText}
                                        >
                                            SET
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={lectionEditStyles.button}
                                        onPress={onCancel}
                                    >
                                        <Text
                                            style={lectionEditStyles.buttonText}
                                        >
                                            CANCEL
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </SafeAreaView>
                </View>
            </Modal>
        </>
    );
}
