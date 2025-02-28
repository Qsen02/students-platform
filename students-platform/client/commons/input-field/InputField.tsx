import { KeyboardTypeOptions, TextInput, View } from "react-native";

interface InputFieldProps {
    value: string | undefined;
    placeholder?: string;
    changeHandler: (e: string) => void;
    keyboardType: KeyboardTypeOptions;
}

export default function InputField({
    value,
    placeholder,
    changeHandler,
    keyboardType,
}: InputFieldProps) {
    return (
        <View>
            <TextInput
                value={value}
                placeholder={placeholder ? placeholder : ""}
                onChangeText={changeHandler}
                keyboardType={keyboardType}
            />
        </View>
    );
}
