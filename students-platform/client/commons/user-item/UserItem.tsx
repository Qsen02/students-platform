import { Text, TouchableOpacity, View } from "react-native";
import { userItemStyles } from "./UserItemStyles";
import { useGetAssessment } from "@/hooks/useAssessments";

interface userItemProps {
    courseId: number;
    userId: number;
    fullname: string;
    facultyNumber: string;
    setAssessmentHandler: React.Dispatch<React.SetStateAction<boolean>>;
    setUserId: React.Dispatch<React.SetStateAction<number | null>>;
    setCourseId: React.Dispatch<React.SetStateAction<number | null>>;
    editAssessmentHandler:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserItem({
    courseId,
    userId,
    fullname,
    facultyNumber,
    setAssessmentHandler,
    setUserId,
    setCourseId,
    editAssessmentHandler
}: userItemProps) {
    const { assessment } = useGetAssessment(null, userId, courseId);

    function setState() {
        setAssessmentHandler(true);
        setUserId(userId);
        setCourseId(courseId);
    }

    function editState(){
        editAssessmentHandler(true);
        setUserId(userId);
        setCourseId(courseId);
    }

    return (
        <View style={userItemStyles.itemWrapper}>
            <View style={userItemStyles.itemHeader}>
                <Text style={userItemStyles.text}>{fullname}</Text>
                <Text style={userItemStyles.text}>
                    Faculty number: {facultyNumber}
                </Text>
                <Text style={userItemStyles.text}>
                    Mark: {assessment ? assessment.assessment : "No mark yet."}
                </Text>
            </View>
            <View style={userItemStyles.buttonWrapper}>
                <TouchableOpacity
                    style={userItemStyles.button}
                    onPress={setState}
                >
                    <Text style={userItemStyles.buttonText}>SET MARK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={userItemStyles.button} onPress={editState}>
                    <Text style={userItemStyles.buttonText}>EDIT MARK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
