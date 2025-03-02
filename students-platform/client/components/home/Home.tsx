import { FlatList, Text, View } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useGetLatestCourses } from "@/hooks/useCourses";
import HomeCourseItem from "./home-course-item/HomeCourseItem";
import Spinner from "react-native-loading-spinner-overlay";

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
                        <HomeCourseItem
                            id={item.id}
                            name={item.courseName}
                            image={item.courseImage}
                        />
                    )}
                />
            )}
        </>
    );
}
