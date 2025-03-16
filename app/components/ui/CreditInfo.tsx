import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function CreditInfo() {
    return (<View style={style.container}>
        <Card>
            <Card.Title title="Crédito" />
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