import ErrorModal from "@/commons/err-modal/ErrorModal";
import InputField from "@/commons/input-field/InputField";
import { lectionEditStyles } from "@/components/lection-details/lection-edit/LectionEditStyles";
import { registerStyles } from "@/components/register/RegisterStyles";
import { useEditAssessment, useGetAssessmentValue } from "@/hooks/useAssessments";
import { useGetUserById } from "@/hooks/useUsers";
import { Assessment } from "@/types/assessment";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";

interface EditAssessmentProp {
    userId: number | null;
    courseId:number | null;
    isClicked: boolean;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
    setAssessmentHandler:React.Dispatch<React.SetStateAction<Assessment|null>>
}

export default function EditAssessment({
    userId,
    courseId,
    isClicked,
    clickHandler,
    setAssessmentHandler
}: EditAssessmentProp) {
    const {values,setValues,loading,error}=useGetAssessmentValue(userId,courseId);
    const {user} = useGetUserById(null, userId);
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);
    const editAssessment=useEditAssessment();

    function onCancel() {
        clickHandler(false);
    }

    async function onEdit() {
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
            if (userId && courseId) {
                const assessment=await editAssessment(userId,courseId,{
                    assessment: values.assessment,
                });
                setAssessmentHandler(assessment);
                clickHandler(false);
            }else{
                clickHandler(false);
                return;
            }
        } catch (err) {
            setErrMessage(["Something went wrong, please try again later!"]);
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
                visible={isErr}
                visibleHanlder={setIsErr}
                message={errMessage.join("\n")}
                messageHandler={setErrMessage}
            />
            <Modal transparent={true} visible={isClicked} animationType="fade">
                <View style={lectionEditStyles.overlay}>
                    <SafeAreaView style={lectionEditStyles.modalContainer}>
                        {error ? (
                            <>
                                <Text style={lectionEditStyles.text}>
                                    Something went wrong! Please try again
                                    later.
                                </Text>
                                <TouchableOpacity
                                    style={lectionEditStyles.button}
                                    onPress={onCancel}
                                >
                                    <Text style={lectionEditStyles.buttonText}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={lectionEditStyles.title}>
                                    Edit mark for student {user?.fullname} here.
                                </Text>
                                <Text style={registerStyles.formText}>
                                    Mark number
                                </Text>
                                <InputField
                                    value={values.assessment}
                                    title="Mark number"
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, assessment: e })
                                    }
                                    keyboardType="numeric"
                                />
                                <View style={lectionEditStyles.buttonWrapper}>
                                    <TouchableOpacity
                                        style={lectionEditStyles.button}
                                        onPress={onEdit}
                                    >
                                        <Text
                                            style={lectionEditStyles.buttonText}
                                        >
                                            EDIT
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