import { View,Text } from "react-native";
import { assessmentItemStyles } from "./AssessmentItemStyles";

export default function AssessmentItem(){
    return (
        <View style={assessmentItemStyles.wrapper}>
            <Text style={assessmentItemStyles.text}>Course: Express and PostgreSQL</Text>
            <Text style={assessmentItemStyles.text}>Mark: 6</Text>
        </View>
    )
}