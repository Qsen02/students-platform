import { Modal, Text, TouchableOpacity, View } from "react-native";
import { deleteModalStyles } from "./DeleteModalStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import { useDeleteLection } from "@/hooks/useLections";

interface DeleteModalProps {
    courseId: number | undefined;
    lectionId: number | undefined;
    lectionName: string | undefined;
    isClicked: boolean;
    clickHanlder: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteModal({
    courseId,
    lectionId,
    lectionName,
    isClicked,
    clickHanlder,
}: DeleteModalProps) {
    const navigation = useNavigation<NavigationProp<Routes>>();
    const deleteLection = useDeleteLection();

    function onCancel() {
        clickHanlder(false);
        navigation.goBack();
    }

    async function onDelete() {
        if (lectionId) {
            await deleteLection(lectionId);
            navigation.navigate("CourseDetails", { courseId: courseId });
        }
    }

    return (
        <Modal transparent={true} visible={isClicked} animationType="fade">
            <View style={deleteModalStyles.overlay}>
                <View style={deleteModalStyles.modalContainer}>
                    <Text style={deleteModalStyles.text}>
                        Are you sure you want to delete {lectionName} lection?
                    </Text>
                    <View style={deleteModalStyles.buttonWrapper}>
                        <TouchableOpacity onPress={onDelete}>
                            <Text style={deleteModalStyles.buttonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={deleteModalStyles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
