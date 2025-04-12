import { FlatList, View } from "react-native";
import { TodoTableItem } from "./TodoTableItem";
import { useCallback, useEffect, useState } from "react";
import { TaskOutput, taskService } from "@/src/services/TaskService";
import { useFocusEffect } from "expo-router";

export default function TodoTable() {
    const [data, setData] = useState<TaskOutput[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const data = await taskService.getTasks();
                setData(data);
            };
            fetchData();
        }, [])
    );

    const handleIconPress = (key: number) => {
        console.log('Icon pressed', key);
    }

    return (
        <>
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TodoTableItem
                            item={item}
                            onPress={() => handleIconPress(item.id)}
                        />
                    )}>
                </FlatList>
            </View>
        </>);
}