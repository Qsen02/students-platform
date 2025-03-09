import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native";

export default function StudentsList(){
    const route=useRoute<RouteProp<Routes,"StudentsList">>();
    const {courseId}=route.params
    
    return (
        <Text>Students list for {courseId} course works!</Text>
    )
}