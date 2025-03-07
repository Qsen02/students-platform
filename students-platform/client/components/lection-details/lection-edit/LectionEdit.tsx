import { Modal, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lectionEditStyles } from "./LectionEditStyles";
import { useEditLection, useGetLectionForEditFrom } from "@/hooks/useLections";
import InputField from "@/commons/input-field/InputField";
import { registerStyles } from "@/components/register/RegisterStyles";
import { Lection } from "@/types/lection";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import ErrorModal from "@/commons/err-modal/ErrorModal";

interface LectionEditProps {
    lectionName: string | undefined;
    isClicked: boolean;
    lectionId: number | undefined;
    setLectionHandler: React.Dispatch<React.SetStateAction<Lection | null>>;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LectionEdit({
    lectionName,
    isClicked,
    lectionId,
    setLectionHandler,
    clickHandler,
}: LectionEditProps) {
    const { values, setValues, loading, error } = useGetLectionForEditFrom(
        { lectionName: "", content: "" },
        lectionId,
        isClicked
    );
    const editLection = useEditLection();
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    function onCancel() {
        clickHandler(false);
    }

    async function onEdit() {
        const errors: string[] = [];
        if (!values.lectionName || !values.content) {
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

        if (lectionId) {
            try {
                const updatedLection = await editLection(lectionId, {
                    lectionName: values.lectionName,
                    content: values.content,
                });
                setLectionHandler(updatedLection);
                clickHandler(false);
            } catch (err) {
                setErrMessage(["Error occurd! Please try again later."]);
                setIsErr(true);
                return;
            }
        } else {
            clickHandler(false);
        }
    }

    return (
        <>
            <ErrorModal
                visible={isErr}
                visibleHanlder={setIsErr}
                message={errMessage.join("\n")}
                messageHandler={setErrMessage}
            />
            <Spinner
                visible={loading}
                animation="fade"
                size="large"
                color="rgb(0, 157, 255)"
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
                                    Edit {lectionName} lection here.
                                </Text>
                                <Text style={registerStyles.formText}>
                                    Lection name
                                </Text>
                                <InputField
                                    value={values.lectionName}
                                    title="Lection name"
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, lectionName: e })
                                    }
                                    keyboardType="default"
                                />
                                <Text style={registerStyles.formText}>
                                    Content
                                </Text>
                                <InputField
                                    value={values.content}
                                    title="Content"
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, content: e })
                                    }
                                    keyboardType="default"
                                    textarea={true}
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
