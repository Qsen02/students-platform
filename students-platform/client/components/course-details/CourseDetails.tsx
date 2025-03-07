import { useUserContext } from "@/context/userContext";
import { Routes } from "@/types/navigation";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { courseDetailsStyles } from "./CourseDetailsStyles";
import { useGetOneCourse } from "@/hooks/useCourses";
import Spinner from "react-native-loading-spinner-overlay";
import { homeStyles } from "../home/HomeStyles";
import LectionItem from "@/commons/lection-item/LectionItem";
import { useState } from "react";
import ErrorModal from "@/commons/err-modal/ErrorModal";
import { useSignForCourse } from "@/hooks/useUsers";
import CourseDelete from "./course-delete/CourseDelete";
import CourseEdit from "./course-edit/CourseEdit";

export default function CourseDetails() {
    const route = useRoute<RouteProp<Routes, "CourseDetails">>();
    const { courseId } = route.params;
    const { user } = useUserContext();
    const {
        course,
        lections,
        setCourse,
        loading,
        setLoading,
        error,
        isSignUp,
        setIsSignUp,
    } = useGetOneCourse(null, [], courseId, user?.id);
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);
    const signForCourse = useSignForCourse();
    const navigation = useNavigation<NavigationProp<Routes>>();
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);

    async function onSign() {
        try {
            setLoading(true);
            if (user) {
                await signForCourse(user.id, courseId);
            } else {
                return;
            }
            setIsSignUp(true);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setIsErr(true);
            setErrMessage(["Something went wrong! Please try again later."]);
            return;
        }
    }

    return (
        <>
            <CourseEdit
                courseName={course?.courseName}
                courseId={course?.id}
                setCourseHandler={setCourse}
                isClicked={isEditClicked}
                clickHandler={setIsEditClicked}
            />
            <CourseDelete
                courseId={course?.id}
                courseName={course?.courseName}
                isClicked={isDeleteClicked}
                clickHanlder={setIsDeleteClicked}
            />
            <ErrorModal
                message={errMessage.join("\n")}
                visibleHanlder={setIsErr}
                visible={isErr}
                messageHandler={setErrMessage}
            />
            <Spinner
                visible={loading}
                color="rgb(0, 157, 255)"
                size="large"
                animation="fade"
            />
            {error ? (
                <View style={homeStyles.error}>
                    <Text style={homeStyles.errorText}>
                        Server is not responding! Please try again later!
                    </Text>
                </View>
            ) : (
                <View style={courseDetailsStyles.detailsWrapper}>
                    <View style={courseDetailsStyles.buttonsWrapper}></View>
                    <View style={courseDetailsStyles.titleWrapper}>
                        <Text style={courseDetailsStyles.detailsTitle}>
                            {course?.courseName}
                        </Text>
                        <Text>Lector: {course?.lector?.fullname}</Text>
                    </View>
                    {user ? (
                        user.role == "lector" &&
                        user.id == course?.lector_id ? (
                            <View style={courseDetailsStyles.buttonsWrapper}>
                                <TouchableOpacity
                                    style={courseDetailsStyles.optionsButton}
                                    onPress={() =>
                                        navigation.navigate("LectionCreate", {
                                            courseId: course.id,
                                        })
                                    }
                                >
                                    <Icon name="plus" color="white" size={15} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={courseDetailsStyles.optionsButton}
                                    onPress={() => setIsDeleteClicked(true)}
                                >
                                    <Icon
                                        name="trash"
                                        size={15}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={courseDetailsStyles.optionsButton}
                                    onPress={()=>setIsEditClicked(true)}
                                >
                                    <Icon name="edit" size={15} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={courseDetailsStyles.optionsButton}
                                >
                                    <Icon name="info" size={15} color="white" />
                                </TouchableOpacity>
                            </View>
                        ) : user.role == "student" && !isSignUp ? (
                            <View style={courseDetailsStyles.optionsWrapper}>
                                <Text style={courseDetailsStyles.optionsText}>
                                    If you want to read lections you must sign
                                    up for this course.
                                </Text>
                                <TouchableOpacity
                                    style={courseDetailsStyles.optionsButton}
                                    onPress={onSign}
                                >
                                    <Text
                                        style={
                                            courseDetailsStyles.optionsButtonText
                                        }
                                    >
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text>
                                    Welcome! You are signed for this course.
                                </Text>
                            </View>
                        )
                    ) : (
                        <View style={courseDetailsStyles.optionsWrapper}>
                            <Text style={courseDetailsStyles.optionsText}>
                                You must create account to sign up for this
                                course!
                            </Text>
                        </View>
                    )}
                    <View style={courseDetailsStyles.lectionWrapper}>
                        <Text style={courseDetailsStyles.detailsTitle}>
                            Lections:
                        </Text>
                        <View style={courseDetailsStyles.lections}>
                            <FlatList
                                data={lections}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <LectionItem
                                        id={item.id}
                                        lectionName={item.lectionName}
                                        isSign={isSignUp}
                                        lectorId={course?.lector_id}
                                    />
                                )}
                                ListEmptyComponent={() => (
                                    <Text
                                        style={courseDetailsStyles.optionsText}
                                    >
                                        No lections in this course yet.
                                    </Text>
                                )}
                            />
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}
