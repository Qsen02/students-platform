import { Modal, Text, TouchableOpacity, View } from "react-native";
import { deleteModalStyles } from "../../lection-details/lection-delete/LectionDeleteStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import { useDeleteCourse } from "@/hooks/useCourses";

interface DeleteModalProps {
    courseId: number | undefined;
    courseName: string | undefined;
    isClicked: boolean;
    clickHanlder: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseDelete({
    courseId,
    courseName,
    isClicked,
    clickHanlder,
}: DeleteModalProps) {
    const navigation = useNavigation<NavigationProp<Routes>>();
    const deleteCourse = useDeleteCourse();

    function onCancel() {
        clickHanlder(false);
    }

    async function onDelete() {
        if (courseId) {
            await deleteCourse(courseId);
            navigation.navigate("Courses");
        }
    }

    return (
        <Modal transparent={true} visible={isClicked} animationType="fade">
            <View style={deleteModalStyles.overlay}>
                <View style={deleteModalStyles.modalContainer}>
                    <Text style={deleteModalStyles.text}>
                        Are you sure you want to delete {courseName} course?
                    </Text>
                    <View style={deleteModalStyles.buttonWrapper}>
                        <TouchableOpacity onPress={onDelete} style={deleteModalStyles.button}>
                            <Text style={deleteModalStyles.buttonText}>
                                DELETE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={deleteModalStyles.button}>
                            <Text style={deleteModalStyles.buttonText}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}