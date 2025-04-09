import { FlatList, View } from "react-native";
import StatusEnum from "@/src/shared/StatusEnum";
import { TodoTableItem } from "./TodoTableItem";
import { useEffect, useState } from "react";
import TaskService, { TaskOutput } from "@/src/services/TaskService";

export default function TodoTable() {
    const [data, setData] = useState<TaskOutput[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const taskService = new TaskService();
            const data = await taskService.getTasks();
            setData(data);
        };

        fetchData();
    }, []);

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