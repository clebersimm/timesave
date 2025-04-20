import { useTaskContext } from "@/src/context/TaskContext";
import { useEffect } from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";

export interface CreditContainerProps {
    taskId: number | undefined;
}

export default function CreditContainer({ taskId }: CreditContainerProps) {
    const { calculateTaskCredit, taskCredit } = useTaskContext();
    useEffect(() => {
        if (taskId === undefined) {
            return;
        }
        calculateTaskCredit(taskId);
    }, [taskId]);

    return (
        <Surface style={styles.creditContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="headlineSmall">Total credit</Text>
                <View>
                    <Text variant="bodyLarge">{taskCredit}</Text>
                </View>
            </View>
        </Surface>
    )
}

const styles = {
    creditContainer: { padding: 8, margin: 2, elevation: 2, borderRadius: 8 },
};