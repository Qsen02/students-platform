import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import UserContextProvider from "./context/userContext";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Login from "./components/login/Login";
import Courses from "./components/courses/Courses";
import CourseCreate from "./components/course-create/CourseCreate";
import CourseDetails from "./components/course-details/CourseDetails";
import LectionDetails from "./components/lection-details/LectioDetails";

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
                        <Stack.Screen
                            name="Logout"
                            component={Logout}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Courses"
                            component={Courses}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Create"
                            component={CourseCreate}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="CourseDetails"
                            component={CourseDetails}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="LectionDetails"
                            component={LectionDetails}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </UserContextProvider>
            </NavigationContainer>
        </>
    );
}
