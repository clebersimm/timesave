import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
import { useTaskContext } from "@/src/context/TaskContext";
import DeleteButton from "@/components/Task/DeleteButton";

export default function Task() {
    const { id } = useLocalSearchParams();
    const [time, setTime] = useState<string>("00:00:00");
    const [activateTimer, setActivateTimer] = useState(false);
    const { getTaskById, task, executeTask, completeTask, deleteTask } = useTaskContext();
    const router = useRouter();

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

    useEffect(() => {
        _getTaskById();
    }, [id]);

    useEffect(() => {
        if (task?.status === StatusEnum.ONGOING) {
            setActivateTimer(true);
        } else {
            setActivateTimer(false);
        }
    }, [task]);

    const _getTaskById = async () => {
        await getTaskById(Number(id));
    }

    const actionHanlder = async (type: TaskTypeEnum) => {
        if (type === TaskTypeEnum.TIME) {
            await executeTask(Number(id));
            setActivateTimer(!activateTimer);
        } else {
            //const data = await taskService.completeTask(Number(id));
            //setData(data);
        }
    };

    const completeHandler = async () => {
        if (task?.status === StatusEnum.COMPLETED) {
            return;
        }
        await completeTask(Number(id));
        setActivateTimer(false);

    };

    const deleteHandler = async () => {
        deleteTask(Number(id));
        router.back();
    }

    const _createHashKey = (taskId: number | undefined) => {
        return taskId?.toString() + Math.random().toString();
    }


    const buttons = [
        {
            component: (
                <ActionButton
                    key={_createHashKey(task?.id) + "action"}
                    task={task}
                    actionHandler={actionHanlder}
                    active={activateTimer}
                />
            ),
            visible: ((task?.status !== StatusEnum.COMPLETED) && (task?.type === TaskTypeEnum.TIME)),
            key: _createHashKey(task?.id),
        },
        {
            component: (
                <CompleteTaskButton
                    key={_createHashKey(task?.id) + "complete"}
                    actionHandler={completeHandler}
                />
            ),
            visible: task?.status !== StatusEnum.COMPLETED,
            key: _createHashKey(task?.id),
        },
        {
            component: (
                <DeleteButton
                    key={_createHashKey(task?.id) + "action"}
                    deleteHandler={deleteHandler}
                />
            ),
            visible: ((task?.status === StatusEnum.PENDING)),
            key: _createHashKey(task?.id),
        }
    ];

    const visibleButtons = buttons
        .filter(button => button.visible)
        .map(button => button.component);

    return (
        <View style={styles.container} key={task?.id}>
            <DetailsData data={task} key="detailsData" />
            {visibleButtons}
            <Surface style={styles.timerContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Time</Text>
                    <Text>{time}</Text>
                </View>
            </Surface>
            <CreditContainer
                taskId={task?.id}
                taskOperation={task?.operation}
            />
            <HistoryContainer
                taskId={task?.id}
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