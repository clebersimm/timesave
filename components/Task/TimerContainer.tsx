import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export interface TimerContainerProps {
    time: string;
}

export default function TimerContainer({ time }: TimerContainerProps) {
    return (
        <Surface style={styles.timerContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Time</Text>
                    <Text>{time}</Text>
                </View>
            </Surface>
    );
}

const styles = StyleSheet.create({
    timerContainer: { padding: 8, margin: 2, elevation: 2, borderRadius: 8 },
});