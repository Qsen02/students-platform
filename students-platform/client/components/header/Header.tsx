import TabIcon from "@/commons/table-icon/TabIcon";
import { View } from "react-native";
import { headerStyles } from "./HeaderStyles";
import { useUserContext } from "@/context/userContext";
import { useRoute } from "@react-navigation/native";

export default function Header() {
    const { user } = useUserContext();
    const route = useRoute();
    return (
        <>
            {user ? (
                user.role == "student" ? (
                    <View style={headerStyles.navContainer}>
                        <View>
                            <TabIcon
                                title={"Home"}
                                color={route.name == "Home" ? "red" : "white"}
                                name={"home"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Courses"}
                                color={route.name == "Courses" ? "red" : "white"}
                                name={"book"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                params={{ userId: user?.id }}
                                title={"Assessments"}
                                color={route.name == "Assessments" ? "red" : "white"}
                                name={"tag"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                params={{ userId: user?.id }}
                                title={"Profile"}
                                color={route.name == "Profile" ? "red" : "white"}
                                name={"user"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Logout"}
                                color={route.name == "Logout" ? "red" : "white"}
                                name={"sign-out"}
                                size={30}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={headerStyles.navContainer}>
                        <View>
                            <TabIcon
                                title={"Home"}
                                color={route.name == "Home" ? "red" : "white"}
                                name={"home"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Courses"}
                                color={route.name == "Courses" ? "red" : "white"}
                                name={"book"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Create"}
                                color={route.name == "Create" ? "red" : "white"}
                                name={"plus"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                params={{ userId: user?.id }}
                                title={"Profile"}
                                color={route.name == "Profile" ? "red" : "white"}
                                name={"user"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Logout"}
                                color={route.name == "Logout" ? "red" : "white"}
                                name={"sign-out"}
                                size={30}
                            />
                        </View>
                    </View>
                )
            ) : (
                <View style={headerStyles.navContainer}>
                    <View>
                        <TabIcon
                            title={"Home"}
                            color={route.name == "Home" ? "red" : "white"}
                            name={"home"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Courses"}
                            color={route.name == "Courses" ? "red" : "white"}
                            name={"book"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Login"}
                            color={route.name == "Login" ? "red" : "white"}
                            name={"sign-in"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Register"}
                            color={route.name == "Register" ? "red" : "white"}
                            name={"user-plus"}
                            size={30}
                        />
                    </View>
                </View>
            )}
        </>
    );
}
