import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper";

interface NewTaskTextInputProps {
    textInputConfig: TextInputProps;
}

export default function NewTaskTextInput({ textInputConfig }: NewTaskTextInputProps) {
    return (
        <View style={styles.container}>
            <TextInput
                {...textInputConfig}
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