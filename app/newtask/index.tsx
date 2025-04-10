import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import OperationInput from "@/components/NewTask/OperationInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import OperationEnum from "@/src/shared/OperationEnum";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { useState } from "react";
import { View } from "react-native";

export type TaksForm = {
    task: string;
    tags: string;
    type: TaskTypeEnum;
    operation: OperationEnum;
}

export default function NewTask() {
    const [inputForm, setInputForm] = useState<TaksForm>({
        task: "",
        tags: "",
        type: TaskTypeEnum.ACTION,
        operation: OperationEnum.CREDIT,
    });
    function inputChagedHandler(inputIdentifier: any, enteredValue: any) {
        setInputForm((currentInputForm) => {
            return {
                ...currentInputForm,
                [inputIdentifier]: enteredValue,
            };
        });
    };
    return (
        <>
            <View style={styles.container}>
                <NewTaskHeader />
                <NewTaskTextInput label="Task" placeholder="Enter the task description" />
                <NewTaskTextInput label="Tags" placeholder="Add some tags" />
                <TaskTypeInput />
                <OperationInput />
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