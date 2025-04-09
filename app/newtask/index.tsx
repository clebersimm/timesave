import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import OperationInput from "@/components/NewTask/OperationInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import { View } from "react-native";

export default function NewTask() {
    return (
        <>
            <View style={styles.container}>
                <NewTaskHeader />
                <NewTaskTextInput label="Task" placeholder="Enter the task description" />
                <TaskTypeInput />
                <OperationInput />
                <NewTaskTextInput label="Tags" placeholder="Add some tags" />
            </View>
        </>
    );
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
};