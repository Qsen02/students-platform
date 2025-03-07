import { Modal, Text, TouchableOpacity, View } from "react-native";
import { deleteModalStyles } from "../../lection-details/lection-delete/LectionDeleteStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";
import { useDeleteCourse } from "@/hooks/useCourses";
import { useState } from "react";
import ErrorModal from "@/commons/err-modal/ErrorModal";

interface CourseDeleteProps {
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
}: CourseDeleteProps) {
    const navigation = useNavigation<NavigationProp<Routes>>();
    const deleteCourse = useDeleteCourse();
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);

    function onCancel() {
        clickHanlder(false);
    }

    async function onDelete() {
        if (courseId) {
            try {
                await deleteCourse(courseId);
                navigation.navigate("Courses");
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
                            Are you sure you want to delete {courseName} course?
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
