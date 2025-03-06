import {
    KeyboardTypeOptions,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { inputFieldsStyles } from "./InputFieldsStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";

interface InputFieldProps {
    value: string | undefined;
    placeholder?: string;
    changeHandler: (e: string) => void;
    keyboardType: KeyboardTypeOptions;
    title?: string;
    textarea?:boolean
}

export default function InputField({
    value,
    placeholder,
    changeHandler,
    keyboardType,
    title,
    textarea
}: InputFieldProps) {
    const [shown, setIsShown] = useState(false);

    function changeShow(){
        if(shown){
            setIsShown(false);
        }else{
            setIsShown(true);
        }
    }

    return (
        <View style={inputFieldsStyles.inputWrapper}>
            <TextInput
                style={textarea?inputFieldsStyles.textarea:inputFieldsStyles.input}
                multiline={textarea}
                value={value}
                placeholder={placeholder ? placeholder : ""}
                onChangeText={changeHandler}
                keyboardType={keyboardType}
                secureTextEntry={(title === "Password" || title === "Repeat password") && !shown}
                placeholderTextColor="darkgrey"
            />
            {title === "Password" || title === "Repeat password" ? (
                shown ? (
                    <TouchableOpacity style={inputFieldsStyles.eyeWrapper} onPress={changeShow}>
                        <Icon name="eye" color="black" size={20} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={inputFieldsStyles.eyeWrapper}  onPress={changeShow}>
                        <Icon name="eye-slash" color="black" size={20} />
                    </TouchableOpacity>
                )
            ) : (
                ""
            )}
        </View>
    );
}
