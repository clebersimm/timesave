import { useTaskContext } from "@/src/context/TaskContext";
import { FlatList, View } from "react-native";
import { HistoryCard } from "./HistoryCard";

export function HistoryTable() {
    const { completedTasks } = useTaskContext();
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={completedTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HistoryCard
                        task={item} />
                )}
                contentContainerStyle={{ 
                    paddingLeft: 8,
                    paddingRight: 8,
                    rowGap: 8,
                }}
            />
        </View>
    );
}