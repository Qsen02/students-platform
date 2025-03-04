import { Image, Text, TouchableOpacity, View } from "react-native";
import alternative from "../../assets/images/alternative-image.jpg";
import { courseItemStyles } from "./CourseItemStyles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { Routes } from "@/types/navigation";

interface HomeCourseItemProps {
    id: number;
    name: string;
    image: string | null;
}

export default function CourseItem({ id, name, image }: HomeCourseItemProps) {
    const [imgError, setImgError] = useState(false);
    const naviagtion = useNavigation<NavigationProp<Routes>>();
    return (
        <View style={courseItemStyles.wrapper}>
            {image ? (
                <Image
                    source={imgError ? alternative : { uri: image }}
                    style={courseItemStyles.image}
                    onError={() => setImgError(true)}
                />
            ) : (
                <Image source={alternative} style={courseItemStyles.image} />
            )}
            <Text style={courseItemStyles.text}>{name}</Text>
            <TouchableOpacity
                style={courseItemStyles.button}
                onPress={() =>
                    naviagtion.navigate("CourseDetails", { courseId: id })
                }
            >
                <Text style={courseItemStyles.buttonText}>DETAILS</Text>
            </TouchableOpacity>
        </View>
    );
}
