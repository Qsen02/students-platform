import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { assessmentSyles } from "./AssessmentsStyles";
import AssessmentItem from "@/commons/assessment-item/AssessmentItem";

export default function Assessments() {
    const route = useRoute<RouteProp<Routes, "Assessments">>();
    const { userId } = route.params;
    return (
        <View style={assessmentSyles.wrapper}>
            <Text style={assessmentSyles.title}>Assessments for Qsen.</Text>
            <View style={assessmentSyles.assessmentContainer}>
                <AssessmentItem/>
                <AssessmentItem/>
                <AssessmentItem/>
            </View>
        </View>
    );
}
