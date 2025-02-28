import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import UserContextProvider from "./context/userContext";
import Register from "./components/register/Register";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <NavigationContainer>
                <UserContextProvider>
                    <Header />
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </UserContextProvider>
            </NavigationContainer>
        </>
    );
}
