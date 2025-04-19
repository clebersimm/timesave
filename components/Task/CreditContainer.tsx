import { taskService } from "@/src/services/TaskService";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";

export interface CreditContainerProps {
    taskId: number | undefined;
    updatedAt: Date;
}

export default function CreditContainer({ taskId, updatedAt }: CreditContainerProps) {
    const [data, setData] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            if (taskId === undefined || taskId === null) {
                return;
            }
            const output = await taskService.calculateTaskCredit(taskId);
            if (!output) {
                return;
            }
            setData(output);
        };
        fetchData();
    }, [updatedAt]);


    return (
        <Surface style={styles.creditContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="headlineSmall">Total credit</Text>
                <View>
                    <Text variant="bodyLarge">{data}</Text>
                </View>
            </View>
        </Surface>
    )
}

const styles = {
    creditContainer: { padding: 8, margin: 2, elevation: 2, borderRadius: 8 },
};