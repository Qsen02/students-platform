import { Text, View } from "react-native";
import { styles } from "./HomeStyles";

export default function Home(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello React Native!</Text>
        </View>
    )
}