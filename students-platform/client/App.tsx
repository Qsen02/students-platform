import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home/Home";
import Header from "./components/header/Header";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
        <NavigationContainer>
            <Header/>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
}
