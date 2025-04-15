import { TaskOutput } from "@/src/services/TaskService";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { act } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export type ActionButtonProps = {
    task: TaskOutput | null;
    actionHandler: Function;
};

export default function ActionButton({ task, actionHandler }: ActionButtonProps) {
    let actionButton = <></>;
    if (task?.type === TaskTypeEnum.TIME) {
        actionButton = (
            <Button
                icon="play"
                mode="contained"
                onPress={() => actionHandler(task.type)}
            >
                Start
            </Button>
        );
    } else {
        actionButton = (
            <Button
                icon="check"
                mode="contained"
                onPress={() => actionHandler(task?.type)}
            >
                Start
            </Button>
        );
    }

    return (
        <View>
            {actionButton}
        </View>
    );
}