import { useUserContext } from "@/context/userContext";
import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { courseDetailsStyles } from "./CourseDetailsStyles";
import { useGetOneCourse } from "@/hooks/useCourses";

export default function CourseDetails() {
    const route = useRoute<RouteProp<Routes, "CourseDetails">>();
    const { courseId } = route.params;
    const { user } = useUserContext();
    const {course,lections,loading,error}=useGetOneCourse({},[],courseId);

    return (
        <View style={courseDetailsStyles.detailsWrapper}>
            <View style={courseDetailsStyles.titleWrapper}>
                <Text style={courseDetailsStyles.detailsTitle}>
                    React Native
                </Text>
                <Text>Lector: Georgi Georgiev</Text>
            </View>
            {user ? (
                user.role == "lector" ? (
                    <View style={courseDetailsStyles.optionsWrapper}>
                        <Text style={courseDetailsStyles.optionsText}>
                            Add new lection to course
                        </Text>
                        <TouchableOpacity
                            style={courseDetailsStyles.optionsButton}
                        >
                            <Icon name="plus" color="white" size={15} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={courseDetailsStyles.optionsWrapper}>
                        <Text style={courseDetailsStyles.optionsText}>
                            If you want to read lections you must sign up for
                            this course.
                        </Text>
                        <TouchableOpacity
                            style={courseDetailsStyles.optionsButton}
                        >
                            <Text style={courseDetailsStyles.optionsButtonText}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <View style={courseDetailsStyles.optionsWrapper}>
                    <Text style={courseDetailsStyles.optionsText}>
                        You must create account to sign up for this course!
                    </Text>
                </View>
            )}
            <View style={courseDetailsStyles.lectionWrapper}>
                <Text style={courseDetailsStyles.detailsTitle}>Lections:</Text>
            </View>
        </View>
    );
}
