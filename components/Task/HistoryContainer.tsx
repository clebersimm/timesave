import { useTaskContext } from "@/src/context/TaskContext";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";


export interface HistoryContainerProps {
    taskId: number | undefined;
};

export default function HistoryContainer({ taskId }: HistoryContainerProps) {
    const { getTaskHistoryByTaskId, taskHistory } = useTaskContext();
    useEffect(() => {
        if (taskId === undefined) {
            return;
        }
        getTaskHistoryByTaskId(taskId);
    }, [taskId]);


    return (
        <Surface style={styles.historyContainer}>
            <View>
                <Text variant="headlineSmall">History</Text>
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
                <FlatList
                    data={taskHistory}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text>{`${item.updatedAt} - ${item.status}`}</Text>
                    )}
                />
            </View>
        </Surface>
    );
}

const styles = {
    historyContainer: { padding: 8, margin: 2, elevation: 2, borderRadius: 8 },
};