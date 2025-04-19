import Loading from "@/components/Loading/Loading";
import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import OperationInput from "@/components/NewTask/OperationInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import { taskService } from "@/src/services/TaskService";
import OperationEnum from "@/src/shared/OperationEnum";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { TextInput, View } from "react-native";


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
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();
    const tagRef = useRef<TextInput>(null);

    function inputChagedHandler(inputIdentifier: string, enteredValue: any) {
        setInputForm((currentInputForm) => {
            return {
                ...currentInputForm,
                [inputIdentifier]: enteredValue,
            };
        });
    };
    function changeValueHandler(inputIdentifier: string, valueSelected: any) {
        setInputForm((currentInputForm) => {
            return {
                ...currentInputForm,
                [inputIdentifier]: valueSelected,
            };
        });
    }
    async function submitHandler() {
        setShowLoading(true);
        const service = taskService;
        await service.addTask({
            task: inputForm.task,
            type: inputForm.type,
            operation: inputForm.operation,
            value: inputForm.value,
            tags: inputForm.tags,
        });
        setShowLoading(false);
        _returnToPreviousScreen();
    }

    function _returnToPreviousScreen() {
        router.dismiss(1)
    }

    function backActionHandler() {
        _returnToPreviousScreen()
    }

    let ValueInput = (<></>);
    if (inputForm.type === TaskTypeEnum.ACTION) {
        ValueInput = (<NewTaskTextInput
            textInputConfig={{
                label: "Value ",
                placeholder: "Add a value",
                keyboardType: "numeric",
                mode: "outlined",
                value: inputForm.value !== undefined ? String(inputForm.value) : undefined,
                onChangeText: inputChagedHandler.bind(this, "value"),
            }}
        />);
    }

    let loading = (<></>);
    if (showLoading) {
        loading = (<Loading />);
    }

    return (
        <>
            <View style={styles.container}>
                <NewTaskHeader
                    backActionHandler={backActionHandler}
                    onSubmit={() => submitHandler()}
                />
                <NewTaskTextInput textInputConfig={{
                    label: "Task *",
                    placeholder: "Add a task",
                    mode: "outlined",
                    value: inputForm.task,
                    returnKeyType: "next",
                    onSubmitEditing: () => {
                        tagRef.current?.focus();
                    },
                    onChangeText: inputChagedHandler.bind(this, "task"),
                }} />
                <NewTaskTextInput
                    textInputConfig={{
                        label: "Tags",
                        mode: "outlined",
                        placeholder: "Add a tag",
                        value: inputForm.tags,
                        ref: tagRef,
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
            {loading}
        </>
    );
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
};