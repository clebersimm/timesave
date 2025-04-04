import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function DebitInfo() {
    return (<View style={style.container}>
        <Card>
            <Card.Title title="Debito" />
            <Card.Content>
                <Text>
                    0
                </Text>
            </Card.Content>
        </Card>
    </View>)
}

const style = StyleSheet.create({
    container: {
        flex: 1
    }
});