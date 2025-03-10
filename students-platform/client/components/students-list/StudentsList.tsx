import React from "react";
import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { studentsListStyles } from "./StudentListStyles";
import UserItem from "@/commons/user-item/UserItem";
import { useGetSignedUsersForCourse } from "@/hooks/useCourses";
import Spinner from "react-native-loading-spinner-overlay";
import { homeStyles } from "../home/HomeStyles";

export default function StudentsList() {
    const route = useRoute<RouteProp<Routes, "StudentsList">>();
    const { courseId } = route.params;
    const { userCourses, setUserCourses, loading, error } =
        useGetSignedUsersForCourse([], courseId);

    return (
        <>
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
                        All students signed for ReactJS course.
                    </Text>
                    <View style={studentsListStyles.listContainer}>
                        <FlatList
                            data={userCourses}
                            keyExtractor={(item) => item.user.id.toString()}
                            renderItem={({ item }) => (
                                <UserItem
                                    userId={item.user.id}
                                    fullname={item.user.fullname}
                                    facultyNumber={item.user.facultyNumber}
                                />
                            )}
                            ListEmptyComponent={()=>(
                                <Text>No signed students yet.</Text>
                            )}
                        />
                    </View>
                </View>
            )}
        </>
    );
}
