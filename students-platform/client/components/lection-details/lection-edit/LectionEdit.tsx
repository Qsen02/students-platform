import { Modal, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lectionEditStyles } from "./LectionEditStyles";
import { useEditLection } from "@/hooks/useLections";
import InputField from "@/commons/input-field/InputField";
import { registerStyles } from "@/components/register/RegisterStyles";
import { useState } from "react";
import { Lection } from "@/types/lection";

interface LectionEditProps {
    lectionName: string | undefined;
    isClicked: boolean;
    lectionId: number | undefined;
    content: string | undefined;
    setLectionHandler: React.Dispatch<React.SetStateAction<Lection | null>>;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LectionEdit({
    lectionName,
    isClicked,
    lectionId,
    content,
    setLectionHandler,
    clickHandler,
}: LectionEditProps) {
    const [values, setValues] = useState({
        lectionName: lectionName,
        content: content,
    });
    console.log(values);
    const editLection = useEditLection();

    function onCancel() {
        clickHandler(false);
    }

    async function onEdit() {
        if (lectionId) {
            const updatedLection = await editLection(lectionId, {
                lectionName: values.lectionName,
                content: values.content,
            });
            setLectionHandler(updatedLection);
            clickHandler(false);
        } else {
            clickHandler(false);
        }
    }

    return (
        <Modal transparent={true} visible={isClicked} animationType="fade">
            <View style={lectionEditStyles.overlay}>
                <SafeAreaView style={lectionEditStyles.modalContainer}>
                    <Text style={lectionEditStyles.text}>
                        Edit {lectionName} lection here.
                    </Text>
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
                    <View style={lectionEditStyles.buttonWrapper}>
                        <TouchableOpacity
                            style={lectionEditStyles.button}
                            onPress={onEdit}
                        >
                            <Text style={lectionEditStyles.buttonText}>
                                EDIT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={lectionEditStyles.button}
                            onPress={onCancel}
                        >
                            <Text style={lectionEditStyles.buttonText}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}
