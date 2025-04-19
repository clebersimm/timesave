import { FlatList, View } from "react-native";
import { TodoTableItem } from "./TodoTableItem";
import { useEffect, useState } from "react";
import { TaskOutput, taskService } from "@/src/services/TaskService";

export interface TodoTableProps {
  updatedAt: Date;
}

export default function TodoTable({ updatedAt }: TodoTableProps) {
  const [data, setData] = useState<TaskOutput[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await taskService.getTasks();
        setData(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, [updatedAt]); // Fetch data whenever `updatedAt` changes

  const handleIconPress = (key: number) => {
    console.log("Icon pressed", key);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoTableItem
            item={item}
            onPress={() => handleIconPress(item.id)}
          />
        )}
      />
    </View>
  );
}