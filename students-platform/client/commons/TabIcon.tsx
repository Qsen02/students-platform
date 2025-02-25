import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TabIconProps {
    title: "Profile" | "Home" | "Courses" | "Assessments" | "Create";
    color: string;
    name: string;
    size: number;
}

export default function TabIcon({ title, color, name, size }: TabIconProps) {
    const navigation = useNavigation<NavigationProp<TabIconProps["title"]>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(title)}>
            <Icon name={name} color={color} size={size} />
            <Text>{title}</Text>
        </TouchableOpacity>
    );
}
