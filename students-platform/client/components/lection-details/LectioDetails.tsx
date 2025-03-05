import { Routes } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LectionDetailsStyles } from "./LectionDetailsStyles";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useUserContext } from "@/context/userContext";

export default function LectionDetails() {
    const route = useRoute<RouteProp<Routes, "LectionDetails">>();
    const { lectionId } = route.params;
    const { user } = useUserContext();
    const [fontSize, setFontSize] = useState("Normal");
    const sizes = ["Small", "Normal", "Big"];

    return (
        <>
            <View style={LectionDetailsStyles.buttonWrapper}>
                {user?.role == "lector" ? (
                    <>
                        <TouchableOpacity style={LectionDetailsStyles.button}>
                            <Text style={LectionDetailsStyles.buttonText}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={LectionDetailsStyles.button}>
                            <Text style={LectionDetailsStyles.buttonText}>DELETE</Text>
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
            <ScrollView style={LectionDetailsStyles.lectionWrapper}>
                <Text style={LectionDetailsStyles.lectionTitle}>
                    React componentes
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod ad mollitia iste laboriosam quibusdam, delectus veniam
                    ut nihil itaque doloribus consequuntur corporis, nisi
                    maiores saepe aperiam temporibus sit nesciunt incidunt
                    reiciendis cum sequi? Earum vel dolores sapiente, veniam
                    perferendis, dolorum dolor cum, molestiae voluptatem ipsam
                    error sed ipsa fugit nisi beatae reiciendis! Quidem, sit
                    laudantium aperiam delectus, dignissimos molestias quo nulla
                    tempore consequuntur a aliquam illum possimus laborum ex est
                    minima commodi expedita adipisci perspiciatis explicabo
                    aliquid aspernatur? Architecto quae similique labore
                    reprehenderit inventore doloremque magnam alias nihil iste
                    aliquid. Sapiente est illo eligendi nisi necessitatibus
                    doloribus error eaque at reprehenderit deserunt tenetur
                    vitae doloremque, rem commodi id dolorum rerum magni quaerat
                    voluptatem aspernatur impedit neque architecto assumenda
                    nesciunt? Repudiandae possimus beatae, iure dignissimos
                    inventore fuga velit adipisci, voluptatum neque quo itaque
                    ipsam officia quas asperiores tenetur saepe! Et harum quia
                    dignissimos? Est qui, eius doloribus sint, quo neque odit,
                    excepturi accusantium nam dolor corrupti! Odit ad, veniam
                    rem voluptatem expedita iusto laboriosam aut ab repellendus
                    quos quia eveniet repellat obcaecati, voluptatum quam?
                    Pariatur odio, iusto commodi, rerum, at veritatis excepturi
                    earum esse et molestias delectus distinctio recusandae.
                    Doloribus quis eos doloremque ducimus. Magni veritatis,
                    debitis sequi magnam odio omnis est voluptate pariatur quo?
                    Pariatur tempore in ea numquam a? Tenetur, quos sit!
                    Perspiciatis soluta, voluptate sit eligendi facilis at sint
                    officia incidunt blanditiis unde corrupti cum ratione totam
                    dolorem illum, nobis itaque odio praesentium quas ullam
                    magnam nesciunt possimus. Similique, doloremque minima cum
                    officiis soluta iusto adipisci eveniet! Ad aspernatur
                    blanditiis modi ratione illum.f
                </Text>
            </ScrollView>
        </>
    );
}
