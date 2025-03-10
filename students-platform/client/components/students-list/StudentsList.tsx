import React, { useState } from "react";
import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { studentsListStyles } from "./StudentListStyles";
import UserItem from "@/commons/user-item/UserItem";
import { useGetSignedUsersForCourse } from "@/hooks/useCourses";
import Spinner from "react-native-loading-spinner-overlay";
import { homeStyles } from "../home/HomeStyles";
import SetAssessment from "./set-assessment/SetAssessment";
import EditAssessment from "./edit-assessment/EditAssessment";

export default function StudentsList() {
    const route = useRoute<RouteProp<Routes, "StudentsList">>();
    const { courseId } = route.params;
    const { userCourses, setUserCourses, course, loading, error } =
        useGetSignedUsersForCourse([], courseId);
    const [isSetAssessmentClicked, setIsSetAssessmentClicked] = useState(false);
    const [choosenUserId, setChoosenUserId] = useState<number | null>(null);
    const [choosenCourseId, setChoosenCourseId] = useState<number | null>(null);
    const [isEditAssessmentClicked, setIsEditAssessmentClicked] =
        useState(false);

    return (
        <>
            <EditAssessment
                isClicked={isEditAssessmentClicked}
                clickHandler={setIsEditAssessmentClicked}
                userId={choosenUserId}
                courseId={choosenCourseId}
            />
            <SetAssessment
                isClicked={isSetAssessmentClicked}
                clickHandler={setIsSetAssessmentClicked}
                userId={choosenUserId}
                courseId={choosenCourseId}
            />
            <Spinner
                visible={loading}
                animation="fade"
                size="large"
                color="rgb(0, 157, 255)"
            />
            {error ? (
                <View style={homeStyles.error}>
                    <Text style={homeStyles.errorText}>
                        Server is not responding, please try again later!
                    </Text>
                </View>
            ) : (
                <View style={studentsListStyles.container}>
                    <Text style={studentsListStyles.title}>
                        All students signed for {course?.courseName} course.
                    </Text>
                    <View style={studentsListStyles.listContainer}>
                        <FlatList
                            data={userCourses}
                            keyExtractor={(item) => item.user.id.toString()}
                            renderItem={({ item }) => (
                                <UserItem
                                    courseId={item.course_id}
                                    userId={item.user.id}
                                    fullname={item.user.fullname}
                                    facultyNumber={item.user.facultyNumber}
                                    setAssessmentHandler={
                                        setIsSetAssessmentClicked
                                    }
                                    setUserId={setChoosenUserId}
                                    setCourseId={setChoosenCourseId}
                                    editAssessmentHandler={setIsEditAssessmentClicked}
                                />
                            )}
                            ListEmptyComponent={() => (
                                <Text>No signed students yet.</Text>
                            )}
                        />
                    </View>
                </View>
            )}
        </>
    );
}
