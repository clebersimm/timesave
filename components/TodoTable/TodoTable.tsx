import { FlatList, StyleSheet, View } from "react-native";
import { TodoTableItem } from "./TodoTableItem";
import { useTaskContext } from "@/src/context/TaskContext";
import { Text } from "react-native-paper";

export default function TodoTable() {
  const { tasks } = useTaskContext();

  const handleIconPress = (key: number) => {
    console.log("Icon pressed", key);
  };

  return (
    <View style={style.container}>
      <FlatList
        ListEmptyComponent={() => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Text>No tasks available</Text>
          </View>
        )}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TodoTableItem
            item={item}
            onPress={() => handleIconPress(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }} 
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