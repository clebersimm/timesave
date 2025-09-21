import { FlatList, StyleSheet, View } from "react-native";
import { TodoTableItem } from "./TodoTableItem";
import { useTaskContext } from "@/src/context/TaskContext";
import { Text } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TodoTable() {
  const { tasks } = useTaskContext();

  const handleIconPress = (key: number) => {
    console.log("Icon pressed", key);
  };

  return (
    <View style={style.container}>
      <FlatList
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, height: '100%' }}>
            <FontAwesome5 name="clipboard-list" size={80} color="black" style={{ marginBottom: 16 }} />
            <Text variant="headlineSmall">No Tasks Available.</Text>
            <Text variant="bodyLarge">Add tasks to get started!</Text>
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
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80
        }}
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