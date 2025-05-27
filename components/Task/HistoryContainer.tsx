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


    return (<>
        <View>
            <Text variant="headlineSmall">History</Text>
        </View>
        <FlatList
            ListEmptyComponent={() => (
                <View style={{ padding: 16, alignItems: 'center' }}>
                    <Text>No history available</Text>
                </View>
            )}
            data={taskHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <Text>{`${item.updatedAt} - ${item.status}`}</Text>
            )}
        />
    </>
    );
}