import { Routes } from "@/types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { lectionItemStyles } from "./LectionItemStyles";
import { useUserContext } from "@/context/userContext";

interface LectionItemProps {
    id: number;
    lectionName: string;
    isSign: boolean;
}

export default function LectionItem({
    id,
    lectionName,
    isSign,
}: LectionItemProps) {
    const navigation = useNavigation<NavigationProp<Routes>>();
    const { user } = useUserContext();
    return (
        <View style={lectionItemStyles.lectionWrapper}>
            <Text style={lectionItemStyles.lectionText}>{lectionName}</Text>
            {user && isSign ? (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("LectionDetails", {
                            lecctionId: id,
                        })
                    }
                    style={lectionItemStyles.lectionButton}
                >
                    <Text style={lectionItemStyles.lectionButtonText}>
                        READ
                    </Text>
                </TouchableOpacity>
            ) : (
                ""
            )}
        </View>
    );
}
