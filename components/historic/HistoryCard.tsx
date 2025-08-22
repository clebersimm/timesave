import { TaskOutput } from "@/src/services/TaskService";
import OperationEnum from "@/src/shared/OperationEnum";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

export interface HistoryCardProps {
    task: TaskOutput;
}

export function HistoryCard({ task }: HistoryCardProps) {
    function formatValue(): string{
        if (task.operation === OperationEnum.DEBIT){
            return `-${task.value}`;
        }
        return `${task.value}`;
    }
    return (
        <Card>
            <Card.Content>
                <Text variant="headlineSmall">{task.task}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Text variant="bodyMedium">Created: {task.createdAt}</Text>
                    <Text variant="bodyMedium">Finished: {task.updatedAt}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text variant="bodyMedium">Operation: {task.operation}</Text>
                    <Text variant="bodyMedium">Value: {formatValue()}</Text>
                </View>
                <Text variant="bodyMedium">Type: {task.type}</Text>
                <Text variant="bodyMedium">Tags: {task.tags}</Text>
            </Card.Content>
        </Card>
    );
}