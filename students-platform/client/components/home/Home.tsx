import { Text, View } from "react-native";
import { homeStyles } from "./HomeStyles";

export default function Home() {
    return (
        <View style={homeStyles.container}>
            <Text>Hello React Native!</Text>
        </View>
    );
}
