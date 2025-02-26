import { Button, Image, Text, View } from "react-native";

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
        <View>
            {image ? <Image src={image} /> : ""}
            <Text>{name}</Text>
            <Button title="Details" />
        </View>
    );
}
