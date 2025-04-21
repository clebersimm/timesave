import { TaskOutput } from "@/src/services/TaskService";
import { View } from "react-native";
import { Text } from "react-native-paper";

export interface HistoryCardProps {
    task: TaskOutput;
}

export function HistoryCard({ task }: HistoryCardProps) {
    return (
        <View style={styles.container} key={task.id} >
            <Text variant="titleMedium">{task.task}</Text>
            <Text variant="bodyMedium">Finished: {task.updatedAt}</Text>
            <Text variant="bodyMedium">Value: {task.value}</Text>
            <Text variant="bodyMedium">Operation: {task.operation}</Text>
            <Text variant="bodyMedium">Type: {task.type}</Text>
            <Text variant="bodyMedium">Tags: {task.tags}</Text>
        </View>
    );
}

const styles = {
    container: {
        padding: 8,
        margin: 4,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
};