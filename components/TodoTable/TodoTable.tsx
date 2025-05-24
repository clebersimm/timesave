import { FlatList, StyleSheet, View } from "react-native";
import { TodoTableItem } from "./TodoTableItem";
import { useTaskContext } from "@/src/context/TaskContext";

export default function TodoTable() {
  const { tasks } = useTaskContext();

  const handleIconPress = (key: number) => {
    console.log("Icon pressed", key);
  };

  return (
    <View style={style.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
  }
});