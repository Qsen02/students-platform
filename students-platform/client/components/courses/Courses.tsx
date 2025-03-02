import InputField from "@/commons/input-field/InputField";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { coursesStyles } from "./CoursesStlyes";
import { useGetAllCourses, useSearchCourses } from "@/hooks/useCourses";
import { homeStyles } from "../home/HomeStyles";
import Spinner from "react-native-loading-spinner-overlay";
import CourseItem from "@/commons/course-items/CourseItem";

export default function Courses() {
    const [serachValue, setSearchValue] = useState({
        query: "",
    });
    const { courses, setCourses, loading, setLoading, error, setError } =
        useGetAllCourses([]);
    const searchCourses = useSearchCourses();
    const [isSearched, setIsSearched] = useState(false);

    async function onSearch() {
        try {
            setError(false);
            setLoading(true);
            setIsSearched(true);
            let query = serachValue.query;
            if (query === "") {
                query = "No value";
            }
            const searchedResults = await searchCourses(query);
            setCourses(searchedResults);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
            return;
        }
    }

    return (
        <>
            <SafeAreaView style={coursesStyles.searchForm}>
                <Text style={coursesStyles.searchTitle}>
                    Search for courses
                </Text>
                <View style={coursesStyles.searchWrapper}>
                    <InputField
                        value={serachValue.query}
                        changeHandler={(e: string) =>
                            setSearchValue({ ...serachValue, query: e })
                        }
                        placeholder="Search for courses..."
                        keyboardType="default"
                    />
                    <TouchableOpacity
                        style={coursesStyles.searchButton}
                        onPress={onSearch}
                    >
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
            {error && !isSearched ? (
                <View style={homeStyles.error}>
                    <Text style={homeStyles.errorText}>
                        Server is not responding, please try again later.
                    </Text>
                </View>
            ) : error && isSearched ? (
                <View style={homeStyles.error}>
                    <Text style={homeStyles.errorText}>
                        No results found :(
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
                />
            )}
        </>
    );
}
