import { HistoryTable } from "@/components/historic/HistoryTable";
import { useTaskContext } from "@/src/context/TaskContext";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Historic() {
  const { fetchCompletedTasks } = useTaskContext();

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <HistoryTable />
    </SafeAreaView>
  );
}
