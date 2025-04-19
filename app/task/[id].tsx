import { TaskOutput, taskService } from "@/src/services/TaskService";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useEffect } from "react";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import StatusEnum from "@/src/shared/StatusEnum";
import DetailsData from "@/components/Task/DetailsData";
import CreditContainer from "@/components/Task/CreditContainer";
import HistoryContainer from "@/components/Task/HistoryContainer";
import ActionButton from "@/components/Task/ActionButton";
import CompleteTaskButton from "@/components/Task/CompleteTaskButton";

export default function Task() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<TaskOutput | null>(null);
    const [time, setTime] = useState<string>("00:00:00");
    const [activateTimer, setActivateTimer] = useState(false);
    const [updatedAt, setUpdatedAt] = useState<Date>(new Date());

    useEffect(() => {
        if (activateTimer) {
            const interval = setInterval(() => {
                setTime((prevTime) => {
                    const [hours, minutes, seconds] = prevTime.split(":").map(Number);
                    let newSeconds = seconds + 1;
                    let newMinutes = minutes;
                    let newHours = hours;

                    if (newSeconds === 60) {
                        newSeconds = 0;
                        newMinutes += 1;
                    }

                    if (newMinutes === 60) {
                        newMinutes = 0;
                        newHours += 1;
                    }

                    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [activateTimer]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const output = await taskService.getTaskById(Number(id));
                if (output?.status === StatusEnum.ONGOING) {
                    setActivateTimer(true);
                }
                setData(output);
                setUpdatedAt(new Date());
            };
            fetchData();
        }, [id])
    );

    const actionHanlder = async (type: TaskTypeEnum) => {
        if (type === TaskTypeEnum.TIME) {
            const output = await taskService.executeTask(Number(id));
            setData(output);
            setActivateTimer(!activateTimer);
            setUpdatedAt(new Date());
        } else {
            //const data = await taskService.completeTask(Number(id));
            //setData(data);
        }
    };

    const completeHandler = async () => {
        if (data?.status === StatusEnum.COMPLETED) {
            return;
        }
        const output = await taskService.completeTask(Number(id));
        setData(output);
        setActivateTimer(false);
        setUpdatedAt(new Date());
    };

    const buttons = [
        {
            component: (
                <ActionButton
                    task={data}
                    actionHandler={actionHanlder}
                    active={activateTimer}
                />
            ),
            visible: ((data?.status !== StatusEnum.COMPLETED) && (data?.type === TaskTypeEnum.TIME)),
            key: "action",
        },
        {
            component: (
                <CompleteTaskButton
                    actionHandler={completeHandler}
                />
            ),
            visible: data?.status !== StatusEnum.COMPLETED,
            key: "complete",
        },
    ];

    const visibleButtons = buttons
        .filter(button => button.visible)
        .map(button => button.component);

    return (
        <View style={styles.container}>
            <DetailsData data={data} />
            {visibleButtons}
            <Surface style={styles.timerContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Time</Text>
                    <Text>{time}</Text>
                </View>
            </Surface>
            <CreditContainer
                taskId={data?.id}
                updatedAt={updatedAt}
            />
            <HistoryContainer
                taskId={data?.id}
                updatedAt={updatedAt}
            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        gap: 8,
    },
    timerContainer: { padding: 8, margin: 2, elevation: 2, borderRadius: 8 },
};