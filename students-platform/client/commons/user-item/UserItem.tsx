import { Text, TouchableOpacity, View } from "react-native";
import { userItemStyles } from "./UserItemStyles";
import { useGetAssessment } from "@/hooks/useAssessments";

interface userItemProps {
    courseId: number;
    userId: number;
    fullname: string;
    facultyNumber: string;
}

export default function UserItem({
    courseId,
    userId,
    fullname,
    facultyNumber,
}: userItemProps) {
    const { assessment } = useGetAssessment(null, userId, courseId);
    return (
        <View style={userItemStyles.itemWrapper}>
            <View style={userItemStyles.itemHeader}>
                <Text style={userItemStyles.text}>{fullname}</Text>
                <Text style={userItemStyles.text}>
                    Faculty number: {facultyNumber}
                </Text>
                <Text style={userItemStyles.text}>
                    Mark: {assessment
                        ? assessment.assessment
                        : "No mark yet."}
                </Text>
            </View>
            <View style={userItemStyles.buttonWrapper}>
                <TouchableOpacity style={userItemStyles.button}>
                    <Text style={userItemStyles.buttonText}>SET MARK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={userItemStyles.button}>
                    <Text style={userItemStyles.buttonText}>EDIT MARK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
