import { Text, TouchableOpacity, View } from "react-native";
import { userItemStyles } from "./UserItemStyles";

interface userItemProps {
    userId: number;
    fullname: string;
    facultyNumber: string;
}

export default function UserItem({
    userId,
    fullname,
    facultyNumber,
}: userItemProps) {
    return (
        <View style={userItemStyles.itemWrapper}>
            <View style={userItemStyles.itemHeader}>
                <Text style={userItemStyles.text}>{fullname}</Text>
                <Text style={userItemStyles.text}>
                    Faculty number: {facultyNumber}
                </Text>
                <Text style={userItemStyles.text}>Mark: 5</Text>
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
