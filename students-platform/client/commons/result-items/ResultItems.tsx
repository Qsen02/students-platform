import { Text, TouchableOpacity, View } from "react-native";
import { ResultItemsStyles } from "./RestultItemsStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";

interface ResultItemsProp {
    courseId: number;
    courseName: string;
}

export default function ResultItems({ courseId, courseName }: ResultItemsProp) {
    const navigation = useNavigation<NavigationProp<Routes>>();

    return (
        <TouchableOpacity
            style={ResultItemsStyles.itemWrapper}
            onPress={() =>
                navigation.navigate("CourseDetails", { courseId: courseId })
            }
        >
            <Text>{courseName}</Text>
        </TouchableOpacity>
    );
}
