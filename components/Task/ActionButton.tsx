import { TaskOutput } from "@/src/services/TaskService";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { act } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export type ActionButtonProps = {
    task: TaskOutput | null;
    actionHandler: Function;
    active?: boolean;
};

export default function ActionButton({ task, actionHandler, active }: ActionButtonProps) {
    let actionButton = <></>;
    if (task?.type === TaskTypeEnum.TIME) {
        actionButton = (
            <Button
                icon={active ? "pause" : "play"}
                mode="contained"
                onPress={() => actionHandler(task.type)}
            >
                {active ? "Pause" : "Start"}
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