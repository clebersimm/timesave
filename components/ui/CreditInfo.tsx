import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function CreditInfo() {
    return (
        <View style={style.container}>
            <View style={style.box}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Crédito</Text>
                <Text>55</Text>
            </View>
            <View style={style.box}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Débitos</Text>
                <Text>30</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,        
    },
    box: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9' // A variant of white
    }
});