import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
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
import TimerContainer from "@/components/Task/TimerContainer";
import * as Notifications from 'expo-notifications';

export default function Task() {
    const { id } = useLocalSearchParams();
    const [time, setTime] = useState<string>("00:00:00");
    const [activateTimer, setActivateTimer] = useState(false);
    const [notificationId, setNotificationId] = useState<string | null>(null);
    const { getTaskById, task, executeTask, completeTask, deleteTask } = useTaskContext();
    const router = useRouter();

    useEffect(() => {
        if (activateTimer) {
            const interval = setInterval(() => {
                setTime((prevTime) => {
                    if (task?.status) {
                        const diff = Math.abs(new Date().getTime() - new Date(task.updated_at).getTime()) / 1000;
                        const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
                        const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
                        const seconds = String(Math.floor(diff % 60)).padStart(2, "0");
                        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
                    }
                    return prevTime;
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
            if (task.updated_at !== null && task.updated_at !== undefined) {
                const diff = Math.abs(new Date().getTime() - new Date(task.updated_at).getTime()) / 1000;
                const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
                const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
                const seconds = String(Math.floor(diff % 60)).padStart(2, "0");
                setTime(`${hours}:${minutes}:${seconds}`);
            }
            setActivateTimer(true);
        } else {
            setActivateTimer(false);
        }
    }, [task]);

    useEffect(() => {
        if (activateTimer) {
            console.log("Timer activated for task:", task?.id);
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Task Ongoing",
                    subtitle: `${task?.tags}`,
                    body: `Task ${task?.id} - ${task?.task}`,
                    sticky: true
                },
                trigger: null, // Trigger immediately
            }).then((tmpId) => {
                setNotificationId(tmpId);
            });
        } else {
            Notifications.dismissNotificationAsync(notificationId? notificationId : "");
        }
    }, [activateTimer]);

    const _getTaskById = async () => {
        await getTaskById(Number(id));
    }

    const actionHanlder = async (type: TaskTypeEnum) => {
        if (type === TaskTypeEnum.TIME) {
            await executeTask(Number(id));
            setActivateTimer(!activateTimer);
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
            <TimerContainer time={time} />
            <CreditContainer
                taskId={task?.id}
                taskOperation={task?.operation}
            />
            <View style={styles.buttonContainer}>
                {visibleButtons}
            </View>
            <HistoryContainer
                taskId={task?.id}
            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
        gap: 8,
    },
    buttonContainer: {
        flexDirection: "row" as const,
        justifyContent: "space-evenly" as const,
        marginTop: 16,
        marginBottom: 16,
    },
};