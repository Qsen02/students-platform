import { Text, TouchableOpacity, View } from "react-native";
import { userItemStyles } from "./UserItemStyles";

export default function UserItem() {
    return (
        <View style={userItemStyles.itemWrapper}>
            <View style={userItemStyles.itemHeader}>
                <Text style={userItemStyles.text}>Qsen Genchev</Text>
                <Text style={userItemStyles.text}>Faculty number: 21011013</Text>
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