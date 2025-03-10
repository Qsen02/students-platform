import { Text, TouchableOpacity, View } from "react-native";
import { userItemStyles } from "./UserItemStyles";
import { useGetAssessment } from "@/hooks/useAssessments";
import { useState } from "react";
import EditAssessment from "@/components/students-list/edit-assessment/EditAssessment";
import SetAssessment from "@/components/students-list/set-assessment/SetAssessment";

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
    const { assessment,setAssessment } = useGetAssessment(null, userId, courseId);
    const [isSetAssessmentClicked, setIsSetAssessmentClicked] = useState(false);
    const [isEditAssessmentClicked, setIsEditAssessmentClicked] =
        useState(false);

    return (
        <>
          <EditAssessment
                isClicked={isEditAssessmentClicked}
                clickHandler={setIsEditAssessmentClicked}
                userId={userId}
                courseId={courseId}
                setAssessmentHandler={setAssessment}
            />
            <SetAssessment
                isClicked={isSetAssessmentClicked}
                clickHandler={setIsSetAssessmentClicked}
                userId={userId}
                courseId={courseId}
                setAssessmentHandler={setAssessment}
            />
            <View style={userItemStyles.itemWrapper}>
                <View style={userItemStyles.itemHeader}>
                    <Text style={userItemStyles.text}>{fullname}</Text>
                    <Text style={userItemStyles.text}>
                        Faculty number: {facultyNumber}
                    </Text>
                    <Text style={userItemStyles.text}>
                        Mark:{" "}
                        {assessment ? assessment.assessment : "No mark yet."}
                    </Text>
                </View>
                <View style={userItemStyles.buttonWrapper}>
                    <TouchableOpacity
                        style={userItemStyles.button}
                        onPress={()=>setIsSetAssessmentClicked(true)}
                    >
                        <Text style={userItemStyles.buttonText}>SET MARK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userItemStyles.button}
                        onPress={()=>setIsEditAssessmentClicked(true)}
                    >
                        <Text style={userItemStyles.buttonText}>EDIT MARK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
