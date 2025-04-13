import { View } from "react-native";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";

export default function Loading() {
    return (
        <Portal>
            <Modal visible={true}
                contentContainerStyle={{ backgroundColor: '#fff', padding: 42, margin: 20 }} onDismiss={() => { }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ marginLeft: 10 }}>Loading...</Text>
                </View>
            </Modal>
        </Portal>
    )
}