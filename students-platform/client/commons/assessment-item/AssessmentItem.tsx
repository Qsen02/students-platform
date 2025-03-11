import { View,Text } from "react-native";
import { assessmentItemStyles } from "./AssessmentItemStyles";

interface AssessmentItemProp{
    courseName:string,
    assessment:number
}

export default function AssessmentItem({courseName,assessment}:AssessmentItemProp){
    return (
        <View style={assessmentItemStyles.wrapper}>
            <Text style={assessmentItemStyles.text}>Course: {courseName}</Text>
            <Text style={assessmentItemStyles.text}>Mark: {assessment}</Text>
        </View>
    )
}