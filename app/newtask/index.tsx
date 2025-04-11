import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import OperationInput from "@/components/NewTask/OperationInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import { taskService } from "@/src/services/TaskService";
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

export default function NewTask(this: any) {
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
    function submitHandler() {
        const service = taskService
        service.addTask({
            task: inputForm.task,
            type: inputForm.type,
            operation: inputForm.operation,
            value: 0,
            tag: inputForm.tags,
        });
    }
    return (
        <>
            <View style={styles.container}>
                <NewTaskHeader 
                    onSubmit={submitHandler}
                />
                <NewTaskTextInput textInputConfig={{
                    label: "Task",
                    placeholder: "Add a task",
                    value: inputForm.task,
                    onChangeText: inputChagedHandler.bind(this, "task"),
                }} />
                <NewTaskTextInput 
                    textInputConfig={{
                        label: "Tags",
                        placeholder: "Add a tag",
                        value: inputForm.tags,
                        onChangeText: inputChagedHandler.bind(this, "tags"),
                    }}
                />
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