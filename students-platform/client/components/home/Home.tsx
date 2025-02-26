import { ScrollView, Text, View } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useGetLatestCourses } from "@/hooks/useCourses";

export default function Home() {
    const {courses,loading,error}=useGetLatestCourses([]);
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
            {/* <ScrollView>
                {
                    courses.map()
                }
            </ScrollView> */}
        </>
    );
}
