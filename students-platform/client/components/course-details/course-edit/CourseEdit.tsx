import { Modal, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lectionEditStyles } from "../../lection-details/lection-edit/LectionEditStyles";
import InputField from "@/commons/input-field/InputField";
import { registerStyles } from "@/components/register/RegisterStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { useEditCourse, useGetCourseForEditFrom } from "@/hooks/useCourses";
import { Course } from "@/types/course";
import { useUserContext } from "@/context/userContext";
import { useGetUserById } from "@/hooks/useUsers";

interface CourseEditProps {
    courseName: string | undefined;
    isClicked: boolean;
    courseId: number | undefined;
    setCourseHandler: React.Dispatch<React.SetStateAction<Course | null>>;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseEdit({
    courseName,
    isClicked,
    courseId,
    setCourseHandler,
    clickHandler,
}: CourseEditProps) {
    const { values, setValues, loading, error } = useGetCourseForEditFrom(
        { courseName: "", courseImage: "" },
        courseId,
        isClicked
    );
    const editCourse = useEditCourse();

    function onCancel() {
        clickHandler(false);
    }

    async function onEdit() {
        if (courseId) {
            const updatedCourse = await editCourse(courseId, {
                courseName: values.courseName,
                courseImage: values.courseImage,
            });
            setCourseHandler(updatedCourse);
            clickHandler(false);
        } else {
            clickHandler(false);
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
                                <Text style={lectionEditStyles.text}>
                                    Edit {courseName} course here.
                                </Text>
                                <Text style={registerStyles.formText}>
                                    Course name
                                </Text>
                                <InputField
                                    value={values.courseName}
                                    title="Course name"
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, courseName: e })
                                    }
                                    keyboardType="default"
                                />
                                <Text style={registerStyles.formText}>
                                    Course image
                                </Text>
                                <InputField
                                    value={values.courseImage}
                                    title="Course image"
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, courseImage: e })
                                    }
                                    keyboardType="default"
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
