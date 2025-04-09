import { View } from "react-native";
import { TextInput } from "react-native-paper";

export type NewTaskTextInputProps = {
    label: string;
    placeholder: string;
};

export default function NewTaskTextInput(props: NewTaskTextInputProps) {
    return (
        <View style={styles.container}>
            <TextInput
                label={props.label}
                placeholder={props.placeholder}
            />
        </View>
    );
}

const styles = {
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    }
};