import React from 'react';
import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { studentsListStyles } from "./StudentListStyles";
import UserItem from "@/commons/user-item/UserItem" 

export default function StudentsList(){
    const route=useRoute<RouteProp<Routes,"StudentsList">>();
    const {courseId}=route.params

    return (
        <View style={studentsListStyles.container}>
            <Text style={studentsListStyles.title}>All students signed for ReactJS course.</Text>
            <View style={studentsListStyles.listContainer}>
                <UserItem/>
                <UserItem/>
                <UserItem/>
            </View>
        </View>
    )
}