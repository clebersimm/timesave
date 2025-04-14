import { TaskOutput, taskService } from "@/src/services/TaskService";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { useEffect } from "react";

export default function Task() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<TaskOutput | null>(null);
    const [time, setTime] = useState<string>("00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
            setTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const data = await taskService.getTaskById(Number(id));
                setData(data);
            };
            fetchData();
        }, [id])
    );
    return (
        <View style={styles.container}>

            <View>
                <Text>Description: {data?.task}</Text>
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
            <View>
                <Button
                    icon="play"
                    mode="contained"
                    onPress={() => {
                        // Handle button press
                    }}
                >
                    Start
                </Button>
            </View>
            <Surface style={styles.timerContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Time</Text>
                    <Text>{time}</Text>
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