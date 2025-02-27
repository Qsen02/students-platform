import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import alternative from "../../../assets/images/alternative-image.jpg";
import { courseItemStyles } from "./HomeCourseItemStyles";

interface HomeCourseItemProps {
    id: number;
    name: string;
    image: string | null;
}

export default function HomeCourseItem({
    id,
    name,
    image,
}: HomeCourseItemProps) {
    return (
        <View style={courseItemStyles.wrapper}>
            {image ? (
                <Image src={image} style={courseItemStyles.image} />
            ) : (
                <Image source={alternative} style={courseItemStyles.image} />
            )}
            <Text style={courseItemStyles.text}>{name}</Text>
            <TouchableOpacity style={courseItemStyles.button}>
                <Text style={courseItemStyles.buttonText}>Details</Text>
            </TouchableOpacity>
        </View>
    );
}
