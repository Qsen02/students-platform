import TabIcon from "@/commons/TableIcon/TabIcon";
import { View } from "react-native";
import { headerStyles } from "./HeaderStyles";

export default function Header() {
    return (
        <>
            <View style={headerStyles.navContainer}>
                <View>
                    <TabIcon title={"Home"} color={"white"} name={"home"} size={30}/>
                </View>
                <View>
                    <TabIcon title={"Courses"} color={"white"} name={"book"} size={30}/>
                </View>
                <View>
                    <TabIcon title={"Assessments"} color={"white"} name={"tag"} size={30}/>
                </View>
                <View>
                    <TabIcon title={"Profile"} color={"white"} name={"user"} size={30}/>
                </View>
                {/* <View>
                    <TabIcon title={"Create"} color={"black"} name={"plus"} size={30}/>
                </View> */}
            </View>
        </>
    );
}
