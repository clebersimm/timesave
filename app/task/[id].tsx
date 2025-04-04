import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Task() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Task ID: 1</Text>
            </View>
            <View>
                <Text>Task Description: teste</Text>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
};