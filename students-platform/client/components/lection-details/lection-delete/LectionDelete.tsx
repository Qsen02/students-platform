import { Modal, Text, TouchableOpacity, View } from "react-native";
import { deleteModalStyles } from "./LectionDeleteStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import { useDeleteLection } from "@/hooks/useLections";
import { useState } from "react";
import ErrorModal from "@/commons/err-modal/ErrorModal";

interface DeleteModalProps {
    courseId: number | undefined;
    lectionId: number | undefined;
    lectionName: string | undefined;
    isClicked: boolean;
    clickHanlder: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LectionDelete({
    courseId,
    lectionId,
    lectionName,
    isClicked,
    clickHanlder,
}: DeleteModalProps) {
    const navigation = useNavigation<NavigationProp<Routes>>();
    const deleteLection = useDeleteLection();
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    function onCancel() {
        clickHanlder(false);
    }

    async function onDelete() {
        if (lectionId) {
            try {
                await deleteLection(lectionId);
                navigation.navigate("CourseDetails", { courseId: courseId });
            } catch (err) {
                setErrMessage(["Error occurd! Please try again later."]);
                setIsErr(true);
                return;
            }
        } else {
            clickHanlder(false);
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
            <Modal transparent={true} visible={isClicked} animationType="fade">
                <View style={deleteModalStyles.overlay}>
                    <View style={deleteModalStyles.modalContainer}>
                        <Text style={deleteModalStyles.text}>
                            Are you sure you want to delete {lectionName}{" "}
                            lection?
                        </Text>
                        <View style={deleteModalStyles.buttonWrapper}>
                            <TouchableOpacity
                                onPress={onDelete}
                                style={deleteModalStyles.button}
                            >
                                <Text style={deleteModalStyles.buttonText}>
                                    DELETE
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onCancel}
                                style={deleteModalStyles.button}
                            >
                                <Text style={deleteModalStyles.buttonText}>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
