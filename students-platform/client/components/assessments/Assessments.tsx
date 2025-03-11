import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { assessmentSyles } from "./AssessmentsStyles";
import AssessmentItem from "@/commons/assessment-item/AssessmentItem";
import { useGetAssessmentsByStudent } from "@/hooks/useAssessments";
import Spinner from "react-native-loading-spinner-overlay";
import { homeStyles } from "../home/HomeStyles";

export default function Assessments() {
    const route = useRoute<RouteProp<Routes, "Assessments">>();
    const { userId } = route.params;
    const { assessments, studentName, loading, error } =
        useGetAssessmentsByStudent([], userId);

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
                <View style={assessmentSyles.wrapper}>
                    <Text style={assessmentSyles.title}>
                        Assessments for {studentName}.
                    </Text>
                    <View style={assessmentSyles.assessmentContainer}>
                        <FlatList
                            data={assessments}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <AssessmentItem
                                    courseName={item.course?.courseName}
                                    assessment={item.assessment}
                                />
                            )}
                        />
                    </View>
                </View>
            )}
        </>
    );
}
