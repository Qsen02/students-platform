import { useGetUser } from "@/hooks/useUsers";
import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { profileStyles } from "./PofileStyles";

export default function Profile() {
    const route = useRoute<RouteProp<Routes, "Profile">>();
    const { userId } = route.params;
    const { user, signedCourse, createdCourses, loading, error } = useGetUser(
        null,
        userId,
        [],
        []
    );

    return (
        <>
            {user?.role == "student" ? (
                <View style={profileStyles.profileHeader}>
                    <Icon name="user-circle" size={50} color="white" />
                    <Text style={profileStyles.profileHeaderText}>
                        Name: {user?.fullname}
                    </Text>
                    <Text style={profileStyles.profileHeaderText}>
                        Faculty number: {user?.facultyNumber}
                    </Text>
                    <Text style={profileStyles.profileHeaderText}>
                        Role: {user?.role}
                    </Text>
                    <Text style={profileStyles.profileHeaderText}>
                        Signed courses: {signedCourse.length}
                    </Text>
                    <View style={profileStyles.buttonWrapper}>
                        <TouchableOpacity style={profileStyles.button}>
                            <Text style={profileStyles.buttonText}>
                                EDIT PROFILE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={profileStyles.button}>
                            <Text style={profileStyles.buttonText}>
                                CHANGE PASSWORD
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={profileStyles.profileHeader}>
                    <Icon name="user-circle" size={50} color="white" />
                    <Text style={profileStyles.profileHeaderText}>
                        Name: {user?.fullname}
                    </Text>
                    <Text style={profileStyles.profileHeaderText}>
                        Role: {user?.role}
                    </Text>
                    <Text style={profileStyles.profileHeaderText}>
                        Created courses: {createdCourses.length}
                    </Text>
                    <View style={profileStyles.buttonWrapper}>
                        <TouchableOpacity style={profileStyles.button}>
                            <Text style={profileStyles.buttonText}>
                                EDIT PROFILE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={profileStyles.button}>
                            <Text style={profileStyles.buttonText}>
                                CHANGE PASSWORD
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}
