import TabIcon from "@/commons/TabIcon";
import { View } from "react-native";

export default function Header() {
    return (
        <>
            <View>
                <View>
                    <TabIcon title={"Home"} color={"black"} name={"home"} size={30}/>
                </View>
                <View>
                    <TabIcon title={"Courses"} color={"black"} name={"book"} size={30}/>
                </View>
                <View>
                    <TabIcon title={"Assessments"} color={"black"} name={"tag"} size={30}/>
                </View>
                <View>
                    <TabIcon title={"Profile"} color={"black"} name={"user"} size={30}/>
                </View>
                {/* <View>
                    <TabIcon title={"Create"} color={"black"} name={"plus"} size={30}/>
                </View> */}
            </View>
        </>
    );
}
