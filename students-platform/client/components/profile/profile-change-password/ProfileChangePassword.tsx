import ErrorModal from "@/commons/err-modal/ErrorModal";
import InputField from "@/commons/input-field/InputField";
import { lectionEditStyles } from "@/components/lection-details/lection-edit/LectionEditStyles";
import { registerStyles } from "@/components/register/RegisterStyles";
import { useChangePassword } from "@/hooks/useUsers";
import { User } from "@/types/user";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileChangePasswordProps {
    userId: number | undefined;
    setUserHandler: React.Dispatch<React.SetStateAction<User | null>>;
    isClicked: boolean;
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileChangePassword({
    userId,
    setUserHandler,
    isClicked,
    clickHandler,
}: ProfileChangePasswordProps) {
    const [values, setValues] = useState({
        password: "",
    });
    const [errMessage, setErrMessage] = useState<string[]>([]);
    const [isErr, setIsErr] = useState(false);
    const changePassword = useChangePassword();
    const [isChanged, setIsChanged] = useState(false);

    function onCancel() {
        clickHandler(false);
    }

    function onAccept() {
        setIsChanged(false);
    }

    async function onEdit() {
        const errors: string[] = [];

        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(values.password)) {
            errors.push(
                "Password must be at least 6 symbols with at least 1 capital letter, digit and sepcial symbol"
            );
        }

        if (errors.length > 0) {
            setErrMessage(errors);
            setIsErr(true);
            return;
        }

        try {
            if (userId) {
                const user=await changePassword(userId,{password:values.password});
                setUserHandler(user);
                clickHandler(false);
                setValues({...values,password:""})
                setIsChanged(true);
            } else {
                clickHandler(false);
                return;
            }
        } catch (err) {
            if(err instanceof Error){
                if(err.message=="Old password can't be the new password!"){
                    setErrMessage([err.message]);
                }else{
                    setErrMessage(["Something went wrong, please try again later!"]);
                }
            }
            setIsErr(true);
            return;
        }
    }

    return (
        <>
            <ErrorModal
                visible={isErr}
                visibleHanlder={setIsErr}
                message={errMessage.join("\n")}
                messageHandler={setErrMessage}
            />
            <Modal transparent={true} visible={isChanged} animationType="fade">
                <View style={lectionEditStyles.overlay}>
                    <View style={lectionEditStyles.modalContainer}>
                        <Text style={lectionEditStyles.text}>
                            Password was changed successfully!
                        </Text>
                        <TouchableOpacity
                            onPress={onAccept}
                            style={lectionEditStyles.button}
                        >
                            <Text style={lectionEditStyles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} visible={isClicked} animationType="fade">
                <View style={lectionEditStyles.overlay}>
                    <SafeAreaView style={lectionEditStyles.modalContainer}>
                        <>
                            <Text style={lectionEditStyles.title}>
                                Change your password here.
                            </Text>
                            <Text style={registerStyles.formText}>
                                New password
                            </Text>
                            <InputField
                                value={values.password}
                                title="Password"
                                changeHandler={(e: string) =>
                                    setValues({ ...values, password: e })
                                }
                                keyboardType="default"
                            />
                            <View style={lectionEditStyles.buttonWrapper}>
                                <TouchableOpacity
                                    style={lectionEditStyles.button}
                                    onPress={onEdit}
                                >
                                    <Text style={lectionEditStyles.buttonText}>
                                        Change
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={lectionEditStyles.button}
                                    onPress={onCancel}
                                >
                                    <Text style={lectionEditStyles.buttonText}>
                                        CANCEL
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    </SafeAreaView>
                </View>
            </Modal>
        </>
    );
}
