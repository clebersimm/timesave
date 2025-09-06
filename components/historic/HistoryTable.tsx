import { useTaskContext } from "@/src/context/TaskContext";
import { FlatList, View } from "react-native";
import { HistoryCard } from "./HistoryCard";
import { Text } from "react-native-paper";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function HistoryTable() {
    const { completedTasks } = useTaskContext();
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListEmptyComponent={
                    () => (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, height: '100%' }}>
                            <FontAwesome5 name="clipboard-check" size={80} color="black" style={{ marginBottom: 16 }} />
                            <Text variant="headlineSmall">No Completed Tasks Yet!</Text>
                            <Text variant="bodyLarge">Once you complete tasks, they will appear here.</Text>
                        </View>
                    )
                }
                data={completedTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HistoryCard
                        task={item} />
                )}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingLeft: 8,
                    paddingRight: 8,
                    rowGap: 8,
                }}
            />
        </View>
    );
}