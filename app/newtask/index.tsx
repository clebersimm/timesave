import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import OperationInput from "@/components/NewTask/OperationInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import { taskService } from "@/src/services/TaskService";
import OperationEnum from "@/src/shared/OperationEnum";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";


export type TaksForm = {
    task: string;
    tags: string;
    type: TaskTypeEnum;
    value: number | undefined;
    operation: OperationEnum;
}

export default function NewTask(this: any) {
    const [inputForm, setInputForm] = useState<TaksForm>({
        task: "",
        tags: "",
        type: TaskTypeEnum.TIME,
        value: 0,
        operation: OperationEnum.CREDIT,
    });
    const router = useRouter();

    function inputChagedHandler(inputIdentifier: any, enteredValue: any) {
        setInputForm((currentInputForm) => {
            return {
                ...currentInputForm,
                [inputIdentifier]: enteredValue,
            };
        });
    };
    function changeValueHandler(inputIdentifier: any, valueSelected: any) {
        setInputForm((currentInputForm) => {
            return {
                ...currentInputForm,
                [inputIdentifier]: valueSelected,
            };
        });
    }
    async function submitHandler() {
        const service = taskService;
        await service.addTask({
            task: inputForm.task,
            type: inputForm.type,
            operation: inputForm.operation,
            value: inputForm.value,
            tags: inputForm.tags,
        });
    }
    function backActionHandler() {
        router.dismiss(1)
    }

    let ValueInput = (<></>);
    if (inputForm.type === TaskTypeEnum.ACTION) {
        ValueInput = (<NewTaskTextInput
            textInputConfig={{
                label: "Value",
                placeholder: "Add a value",
                value: inputForm.value !== undefined ? String(inputForm.value) : undefined,
                onChangeText: inputChagedHandler.bind(this, "value"),
            }}
        />);
    }

    return (
        <>
            <View style={styles.container}>
                <NewTaskHeader
                    backActionHandler={backActionHandler}
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
                <TaskTypeInput
                    value={inputForm.type}
                    onValueChangeHandler={(newValue: TaskTypeEnum) => changeValueHandler("type", newValue)}
                />
                {ValueInput}
                <OperationInput
                    value={inputForm.operation}
                    onValueChangeHandler={(newValue: TaskTypeEnum) => changeValueHandler("operation", newValue)}
                />
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