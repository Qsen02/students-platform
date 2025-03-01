import { Modal, View, Text, TouchableOpacity } from "react-native";
import { ErrorModalStyles } from "./ErrorModalStyles";

interface ErrorModalProps {
    message: string;
    visible: boolean;
    visibleHanlder: React.Dispatch<React.SetStateAction<boolean>>;
    messageHandler: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ErrorModal({
    message,
    visible,
    visibleHanlder,
    messageHandler,
}: ErrorModalProps) {
    function close() {
        visibleHanlder(false);
        messageHandler([]);
    }

    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={ErrorModalStyles.overlay}>
                <View style={ErrorModalStyles.modalContainer}>
                    <Text style={ErrorModalStyles.text}>{message}</Text>
                    <TouchableOpacity onPress={close} >
                        <Text style={ErrorModalStyles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
