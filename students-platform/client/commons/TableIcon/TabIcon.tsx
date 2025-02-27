import { NavigationProp, useNavigation } from "@react-navigation/native";
import {Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { tabIconStyles } from "./TableIconStyles";
import { GuestNav, LectorNav, UserNav } from "@/types/navigation";

interface TabIconProps {
    title: GuestNav | UserNav | LectorNav;
    color: string;
    name: string;
    size: number;
}

export default function TabIcon({ title, color, name, size }: TabIconProps) {
    const navigation = useNavigation<NavigationProp<TabIconProps["title"]>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(title)} style={tabIconStyles.item}>
            <Icon name={name} color={color} size={size} />
            <Text style={tabIconStyles.itemText}>{title}</Text>
        </TouchableOpacity>
    );
}
