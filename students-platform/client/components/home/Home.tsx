import { FlatList, Text, View } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useGetLatestCourses } from "@/hooks/useCourses";
import Spinner from "react-native-loading-spinner-overlay";
import CourseItem from "../../commons/course-items/CourseItem";
import { coursesStyles } from "../courses/CoursesStlyes";

export default function Home() {
    const { courses, loading, error } = useGetLatestCourses([]);
    return (
        <>
            <View style={homeStyles.container}>
                <Text style={homeStyles.title}>
                    Welcome! This is student platform.
                </Text>
                <Text style={homeStyles.text}>
                    In this platfom you can sign up in courses and you can read
                    lections in this courses!
                </Text>
            </View>
            <View>
                <Text style={homeStyles.latest}>Latest courses</Text>
            </View>
            <Spinner
                visible={loading}
                color="rgb(0, 157, 255)"
                animation="fade"
                size={"large"}
            />
            {error ? (
                <View style={homeStyles.error}>
                    <Text style={homeStyles.errorText}>
                        Server is not responding, please try again later.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={courses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CourseItem
                            id={item.id}
                            name={item.courseName}
                            image={item.courseImage}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <Text style={coursesStyles.text}>No courses yet.</Text>
                    )}
                />
            )}
        </>
    );
}
