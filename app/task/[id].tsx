import { TaskOutput, taskService } from "@/src/services/TaskService";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Task() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<TaskOutput | null>(null);
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
                <Text>Task ID: {id}</Text>
            </View>
            <View>
                <Text>Task Description: {data?.task}</Text>
            </View>
            <View>
                <Text>Task Status: {data?.status}</Text>
            </View>
            <View>
                <Text>Task Created At: {data?.created_at}</Text>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
};