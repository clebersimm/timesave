import AppFab from "./ui/AppFab";
import { StyleSheet, View } from "react-native";

export default function FabNewActivity() {

    return (<View style={styles.fab}>
        <AppFab />
    </View>)
}


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})