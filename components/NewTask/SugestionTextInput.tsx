import { View } from "react-native";
import { TextInput } from "react-native-paper";

export default function SuggestionTextInput() {
    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Suggestions"
                placeholder="Type to see suggestions"
                style={styles.textInput}
            />
        </View>
    );
}

const styles = {
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    textInput: {
        backgroundColor: "#f0f0f0",
    },
};