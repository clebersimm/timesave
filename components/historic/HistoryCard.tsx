import { TaskOutput } from "@/src/services/TaskService";
import OperationEnum from "@/src/shared/OperationEnum";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import TaskTypeIcon from "../TodoTable/TaskTypeIcon";

export interface HistoryCardProps {
    task: TaskOutput;
}

export function HistoryCard({ task }: HistoryCardProps) {
    function formatValue(): React.ReactNode {
        let value = <Text style={style.labelCredit}>Credit: {`${task.value}`}</Text>;
        if (task.operation === OperationEnum.DEBIT) {
            value = <Text style={style.labelDebit}>Debit: {`-${task.value}`}</Text>;
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
                {taskTypeIcon()}
                {value}
            </View>
        );
    }
    function taskTypeIcon(): React.ReactNode {
        return <TaskTypeIcon type={task.type} />;
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
                <Text variant="bodyMedium">Tags: {task.tags}</Text>
                {formatValue()}
            </Card.Content>
        </Card>
    );
}

const style = StyleSheet.create({
    labelCredit: {
        color: "#008000", // Dark green for credit
    },
    labelDebit: {
        color: "#ff0000", // Red for debit
    },
});