import { Text, TouchableOpacity, View } from "react-native";
import { logoutStyles } from "./LogoutStlyes";
import { useUserContext } from "@/context/userContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "@/types/navigation";

export default function Logout() {
    const { removeCurUser } = useUserContext();
    const navigation = useNavigation<NavigationProp<Routes>>();

    function onBack() {
        navigation.goBack();
    }

    async function onLogout() {
        navigation.navigate("Login");
        if (removeCurUser) {
            await removeCurUser();
        }
    }

    return (
        <View style={logoutStyles.logoutWrapper}>
            <Text style={logoutStyles.title}>
                Are you sure you want to logout?
            </Text>
            <View style={logoutStyles.buttonsWrapper}>
                <TouchableOpacity style={logoutStyles.buttons} onPress={onLogout}>
                    <Text style={logoutStyles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={logoutStyles.buttons} onPress={onBack}>
                    <Text style={logoutStyles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
