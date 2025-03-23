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
                                color={route.name == "Home" ? "rgb(224, 64, 96)" : "white"}
                                name={"home"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Courses"}
                                color={route.name == "Courses" ? "rgb(251, 62, 62)" : "white"}
                                name={"book"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                params={{ userId: user?.id }}
                                title={"Assessments"}
                                color={route.name == "Assessments" ? "rgb(251, 62, 62)" : "white"}
                                name={"tag"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                params={{ userId: user?.id }}
                                title={"Profile"}
                                color={route.name == "Profile" ? "rgb(251, 62, 62)" : "white"}
                                name={"user"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Logout"}
                                color={route.name == "Logout" ? "rgb(251, 62, 62)" : "white"}
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
                                color={route.name == "Home" ? "rgb(251, 62, 62)" : "white"}
                                name={"home"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Courses"}
                                color={route.name == "Courses" ? "rgb(251, 62, 62)" : "white"}
                                name={"book"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Create"}
                                color={route.name == "Create" ? "rgb(251, 62, 62)" : "white"}
                                name={"plus"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                params={{ userId: user?.id }}
                                title={"Profile"}
                                color={route.name == "Profile" ? "rgb(251, 62, 62)" : "white"}
                                name={"user"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Logout"}
                                color={route.name == "Logout" ? "rgb(251, 62, 62)" : "white"}
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
                            color={route.name == "Home" ? "rgb(251, 62, 62)" : "white"}
                            name={"home"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Courses"}
                            color={route.name == "Courses" ? "rgb(251, 62, 62)" : "white"}
                            name={"book"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Login"}
                            color={route.name == "Login" ? "rgb(251, 62, 62)" : "white"}
                            name={"sign-in"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Register"}
                            color={route.name == "Register" ? "rgb(251, 62, 62)" : "white"}
                            name={"user-plus"}
                            size={30}
                        />
                    </View>
                </View>
            )}
        </>
    );
}
