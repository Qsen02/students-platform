import ErrorModal from "@/commons/err-modal/ErrorModal";
import InputField from "@/commons/input-field/InputField";
import { lectionEditStyles } from "@/components/lection-details/lection-edit/LectionEditStyles";
import { registerStyles } from "@/components/register/RegisterStyles";
import { useEditUser, useGetUserValues } from "@/hooks/useUsers";
import { User } from "@/types/user";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileEditProps {
    userId: number | undefined;
    setUserHandler:React.Dispatch<React.SetStateAction<User | null>>;
    isClicked: boolean;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileEdit({
    userId,
    setUserHandler,
    isClicked,
    clickHandler,
}: ProfileEditProps) {
    const { values, setValues, loading, error } = useGetUserValues(
        userId,
        isClicked
    );
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);
    const editUser = useEditUser();

    function onCancel() {
        clickHandler(false);
    }

    async function onEdit() {
        const errors: string[] = [];

        if (!values.fullname || values.fullname?.length < 3) {
            errors.push("Full name must be at least 3 symbols long!");
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
        }

        try {
            if (userId) {
                const curUser = await editUser(userId, {
                    fullname: values.fullname,
                });
                setUserHandler(curUser);
                clickHandler(false);
            }else{
                clickHandler(false);
                return;
            }
        } catch (err) {
            setErrMessage(["Something went wrong, please try again later!"]);
            setIsErr(true);
            return;
        }
    }

    return (
        <>
            <Spinner
                visible={loading}
                animation="fade"
                size="large"
                color="rgb(0, 157, 255)"
            />
            <ErrorModal
                visible={isErr}
                visibleHanlder={setIsErr}
                message={errMessage.join("\n")}
                messageHandler={setErrMessage}
            />
            <Modal transparent={true} visible={isClicked} animationType="fade">
                <View style={lectionEditStyles.overlay}>
                    <SafeAreaView style={lectionEditStyles.modalContainer}>
                        {error ? (
                            <>
                                <Text style={lectionEditStyles.text}>
                                    Something went wrong! Please try again
                                    later.
                                </Text>
                                <TouchableOpacity
                                    style={lectionEditStyles.button}
                                    onPress={onCancel}
                                >
                                    <Text style={lectionEditStyles.buttonText}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={lectionEditStyles.title}>
                                    Edit your profile name here.
                                </Text>
                                <Text style={registerStyles.formText}>
                                    Full name
                                </Text>
                                <InputField
                                    value={values.fullname}
                                    title="Course name"
                                    changeHandler={(e: string) =>
                                        setValues({ ...values, fullname: e })
                                    }
                                    keyboardType="default"
                                />
                                <View style={lectionEditStyles.buttonWrapper}>
                                    <TouchableOpacity
                                        style={lectionEditStyles.button}
                                        onPress={onEdit}
                                    >
                                        <Text
                                            style={lectionEditStyles.buttonText}
                                        >
                                            EDIT
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={lectionEditStyles.button}
                                        onPress={onCancel}
                                    >
                                        <Text
                                            style={lectionEditStyles.buttonText}
                                        >
                                            CANCEL
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </SafeAreaView>
                </View>
            </Modal>
        </>
    );
}
