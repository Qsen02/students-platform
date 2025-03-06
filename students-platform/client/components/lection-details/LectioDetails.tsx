import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LectionDetailsStyles } from "./LectionDetailsStyles";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useUserContext } from "@/context/userContext";
import { useGetOneLection } from "@/hooks/useLections";
import Spinner from "react-native-loading-spinner-overlay";
import { homeStyles } from "../home/HomeStyles";
import DeleteModal from "@/commons/delete-modal/DeleteModal";

export default function LectionDetails() {
    const route = useRoute<RouteProp<Routes, "LectionDetails">>();
    const { lectionId, lectorId } = route.params;
    const { user } = useUserContext();
    const [fontSize, setFontSize] = useState("Normal");
    const sizes = ["Small", "Normal", "Big"];
    const { lection, loading, error } = useGetOneLection(null, lectionId);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);

    return (
        <>
            <DeleteModal
                courseId={lection?.course_id}
                lectionId={lection?.id}
                lectionName={lection?.lectionName}
                isClicked={isDeleteClicked}
                clickHanlder={setIsDeleteClicked}
            />
            <Spinner
                visible={loading}
                animation="fade"
                color="rgb(0, 157, 255)"
                size="large"
            />
            <View style={LectionDetailsStyles.buttonWrapper}>
                {lectorId == user?.id ? (
                    <>
                        <TouchableOpacity style={LectionDetailsStyles.button}>
                            <Text style={LectionDetailsStyles.buttonText}>
                                EDIT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={LectionDetailsStyles.button}
                            onPress={() => setIsDeleteClicked(true)}
                        >
                            <Text style={LectionDetailsStyles.buttonText}>
                                DELETE
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    ""
                )}
                <SelectDropdown
                    data={sizes}
                    onSelect={(selectedItem: string, index) =>
                        setFontSize(selectedItem)
                    }
                    defaultValue={"normal"}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <TouchableOpacity
                                style={LectionDetailsStyles.pickerButton}
                            >
                                <Text style={{ fontSize: 16 }}>{fontSize}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{
                                    padding: 10,
                                    backgroundColor: isSelected
                                        ? "rgb(0, 157, 255)"
                                        : "white",
                                }}
                            >
                                <Text
                                    style={{
                                        color: isSelected ? "white" : "black",
                                    }}
                                >
                                    {item}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
            {error ? (
                <View style={homeStyles.error}>
                    <Text style={homeStyles.errorText}>
                        Server is not responding, please try again later.
                    </Text>
                </View>
            ) : (
                <ScrollView style={LectionDetailsStyles.lectionWrapper}>
                    <Text style={LectionDetailsStyles.lectionTitle}>
                        {lection?.lectionName}
                    </Text>
                    <Text
                        style={
                            fontSize == "Small"
                                ? LectionDetailsStyles.smallContent
                                : fontSize == "Normal"
                                ? LectionDetailsStyles.normalContent
                                : fontSize == "Big"
                                ? LectionDetailsStyles.bigContent
                                : ""
                        }
                    >
                        {lection?.content}
                    </Text>
                </ScrollView>
            )}
        </>
    );
}
