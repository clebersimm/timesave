import { View } from "react-native";
import { Surface, Text } from "react-native-paper";


export default function CreditContainer(){
    return (
        <Surface style={styles.creditContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text variant="headlineSmall">Total credit</Text>
            <View>
                <Text variant="bodyLarge">45</Text>
            </View>
        </View>
    </Surface>
    )
}

const styles = {
    creditContainer: { padding: 8, margin: 2, elevation: 2, borderRadius: 8 },
};