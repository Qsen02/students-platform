import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { coursesStyles } from "./CoursesStlyes";
import { useGetAllCourses } from "@/hooks/useCourses";
import { homeStyles } from "../home/HomeStyles";
import Spinner from "react-native-loading-spinner-overlay";
import HomeCourseItem from "../home/home-course-item/HomeCourseItem";

export default function Courses() {
    const [serachValue, setSearchValue] = useState({
        query: "",
    });
    const {courses,loading,error}=useGetAllCourses([]);
    return (
        <>
            <SafeAreaView style={coursesStyles.searchForm}>
                <Text style={coursesStyles.searchTitle}>Search for courses</Text>
                <View style={coursesStyles.searchWrapper}>
                    <InputField
                        value={serachValue.query}
                        changeHandler={(e: string) =>
                            setSearchValue({ ...serachValue, query: e })
                        }
                        placeholder="Search for courses..."
                        keyboardType='default'
                    />
                    <TouchableOpacity style={coursesStyles.searchButton}>
                        <Icon name="search" color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <Text style={coursesStyles.searchTitle}>All Courses</Text>
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
