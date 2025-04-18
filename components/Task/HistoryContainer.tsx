import { TaskHistoryOutput, taskService } from "@/src/services/TaskService";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export interface HistoryContainerProps {
    taskId: number | undefined;
    updatedAt: Date;
};

export default function HistoryContainer({ taskId, updatedAt }: HistoryContainerProps) {
    const [data, setData] = useState<TaskHistoryOutput[]>([]);
    useEffect(() => {
        const fetchData = async () => {

            if(taskId === undefined || taskId === null) {
                return; 
            }
            const data = await taskService.getTaskHistoryByTaskId(taskId);
            if (!data) {
                return;
            }
            setData(data);
        };
        fetchData();
    }, [updatedAt]);


    return (
        <Surface style={styles.historyContainer}>
            <View>
                <Text variant="headlineSmall">History</Text>
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
                <FlatList
                    data={data}
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