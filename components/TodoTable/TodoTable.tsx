import { FlatList, View } from "react-native";
import { TodoTableItem } from "./TodoTableItem";
import { useTaskContext } from "@/src/context/TaskContext";

export default function TodoTable() {
  const { tasks } = useTaskContext();

  const handleIconPress = (key: number) => {
    console.log("Icon pressed", key);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
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