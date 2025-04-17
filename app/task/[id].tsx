import { TaskOutput, taskService } from "@/src/services/TaskService";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useEffect } from "react";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import ActionButton from "@/components/Task/ActionButton";
import StatusEnum from "@/src/shared/StatusEnum";

export default function Task() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<TaskOutput | null>(null);
    const [time, setTime] = useState<string>("00:00:00");
    const [activateTimer, setActivateTimer] = useState(false);

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
                const data = await taskService.getTaskById(Number(id));
                if (data?.status === StatusEnum.ONGOING) {
                    setActivateTimer(true);
                }
                setData(data);
            };
            fetchData();
        }, [id])
    );

    const actionHanlder = async (type: TaskTypeEnum) => {
        console.log("actionHanlder", type);
        if (type === TaskTypeEnum.TIME) {
            const data = await taskService.executeTask(Number(id));
            console.log(data);
            setData(data);
            setActivateTimer(!activateTimer);
        } else {
            //const data = await taskService.completeTask(Number(id));
            //setData(data);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>Task: {data?.task}</Text>
            </View>
            <View>
                <Text>Status: {data?.status}</Text>
            </View>
            <View>
                <Text>Created At: {data?.createdAt}</Text>
            </View>
            <View>
                <Text>Type: {data?.type}</Text>
            </View>
            <View>
                <Text>Operation: {data?.operation}</Text>
            </View>
            <ActionButton task={data}
                actionHandler={actionHanlder}
                active={activateTimer} />
            <Surface style={styles.timerContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Time</Text>
                    <Text>{time}</Text>
                </View>
            </Surface>
            <Surface>
                <View>
                    <Text variant="headlineSmall">Total credit</Text>
                    <View>
                        <Text variant="bodyLarge">45</Text>
                    </View>
                </View>
            </Surface>
            <Surface>
                <View>
                    <Text variant="headlineSmall">History</Text>
                </View>
                <View>
                    <Text>17/04/2025 11:30- Finished</Text>
                    <Text>17/04/2025 11:00- Started</Text>
                    <Text>17/04/2025 10:15 - Stoped</Text>
                    <Text>17/04/2025 10:00- Started</Text>
                </View>
            </Surface>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    timerContainer: { padding: 16, margin: 8, elevation: 4, borderRadius: 8 },
};