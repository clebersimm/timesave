import OperationInput from "@/components/NewTask/OperationInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { View } from "react-native";
import { RadioButton, Text, TextInput } from "react-native-paper";

export default function NewTask() {
    return (
        <View style={styles.container}>
            <TextInput label="Task" />
            <TaskTypeInput />
            <OperationInput />
            <TextInput
                label="Tags"
            />
        </View>
    );
}
const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
};