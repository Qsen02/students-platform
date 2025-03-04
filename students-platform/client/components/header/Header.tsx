import TabIcon from "@/commons/table-icon/TabIcon";
import { View } from "react-native";
import { headerStyles } from "./HeaderStyles";
import { useUserContext } from "@/context/userContext";

export default function Header() {
    const { user } = useUserContext();
    return (
        <>
            {user ? (
                user.role == "student" ? (
                    <View style={headerStyles.navContainer}>
                        <View>
                            <TabIcon
                                title={"Home"}
                                color={"white"}
                                name={"home"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Courses"}
                                color={"white"}
                                name={"book"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Assessments"}
                                color={"white"}
                                name={"tag"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Profile"}
                                color={"white"}
                                name={"user"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Logout"}
                                color={"white"}
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
                                color={"white"}
                                name={"home"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Courses"}
                                color={"white"}
                                name={"book"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Create"}
                                color={"white"}
                                name={"plus"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Profile"}
                                color={"white"}
                                name={"user"}
                                size={30}
                            />
                        </View>
                        <View>
                            <TabIcon
                                title={"Logout"}
                                color={"white"}
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
                            color={"white"}
                            name={"home"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Courses"}
                            color={"white"}
                            name={"book"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Login"}
                            color={"white"}
                            name={"sign-in"}
                            size={30}
                        />
                    </View>
                    <View>
                        <TabIcon
                            title={"Register"}
                            color={"white"}
                            name={"user-plus"}
                            size={30}
                        />
                    </View>
                </View>
            )}
        </>
    );
}
