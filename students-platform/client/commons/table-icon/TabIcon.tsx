import { NavigationProp, useNavigation } from "@react-navigation/native";
import {Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { tabIconStyles } from "./TableIconStyles";
import { Routes } from "@/types/navigation";

export interface TabIconProps {
    params?:object;
    title: string;
    color: string;
    name: string;
    size: number;
}

export default function TabIcon({ params,title, color, name, size }: TabIconProps) {
    const navigation = useNavigation<NavigationProp<Routes>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(title,params)} style={tabIconStyles.item}>
            <Icon name={name} color={color} size={size} />
            <Text style={tabIconStyles.itemText}>{title}</Text>
        </TouchableOpacity>
    );
}
