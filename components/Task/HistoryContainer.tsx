import { useTaskContext } from "@/src/context/TaskContext";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";


export interface HistoryContainerProps {
    taskId: number | undefined;
    taskType: TaskTypeEnum | undefined;
};

export default function HistoryContainer({ taskId, taskType }: HistoryContainerProps) {
    const { getTaskHistoryByTaskId, taskHistory } = useTaskContext();
    useEffect(() => {
        if(taskType === TaskTypeEnum.ACTION){
            return;
        }
        if (taskId === undefined) {
            return;
        }
        getTaskHistoryByTaskId(taskId);
    }, [taskId]);

    const _visible = (): boolean => {
        if(taskType === TaskTypeEnum.ACTION){
            return false;
        }
        return true;
    }


    return(<>
        {_visible() && (
            <>
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
        )}
    </>
    );
}