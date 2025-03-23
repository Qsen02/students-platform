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
import LectionCreate from "./components/lection-create/LectionCreate";
import Profile from "./components/profile/Profile";
import StudentsList from "./components/students-list/StudentsList";
import Assessments from "./components/assessments/Assessments";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <NavigationContainer>
                <UserContextProvider>
                    <Stack.Navigator screenOptions={{
                        header:()=><Header/>
                    }}>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                        />
                        <Stack.Screen
                            name="Logout"
                            component={Logout}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            name="Courses"
                            component={Courses}
                        />
                        <Stack.Screen
                            name="Create"
                            component={CourseCreate}
                        />
                        <Stack.Screen
                            name="CourseDetails"
                            component={CourseDetails}
                        />
                        <Stack.Screen
                            name="LectionDetails"
                            component={LectionDetails}
                        />
                        <Stack.Screen
                            name="LectionCreate"
                            component={LectionCreate}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={Profile}
                        />
                        <Stack.Screen
                            name="StudentsList"
                            component={StudentsList}
                        />
                        <Stack.Screen
                            name="Assessments"
                            component={Assessments}
                        />
                    </Stack.Navigator>
                </UserContextProvider>
            </NavigationContainer>
        </>
    );
}
