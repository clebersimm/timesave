import Loading from "@/components/Loading/Loading";
import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import OperationInput from "@/components/NewTask/OperationInput";
import SuggestionTextInput from "@/components/NewTask/SugestionTextInput";
import TaskTypeInput from "@/components/NewTask/TaskTypeInput";
import { useTaskContext } from "@/src/context/TaskContext";
import { Task } from "@/src/repository/TaskRepository";
import { TaskInput } from "@/src/services/TaskService";
import OperationEnum from "@/src/shared/OperationEnum";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export type TaksForm = {
    task: string;
    tags: string;
    type: TaskTypeEnum;
    value: number | undefined;
    operation: OperationEnum;
}

export default function NewTask(this: any) {
    const { addTask, fetchSuggestionsTaks } = useTaskContext();
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
    const [searchText, setSearchText] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Task[]>([]);

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
        if (inputForm.task.trim().length === 0) {
            Alert.alert("Invalid input", "Task name should not be empty.");
            return;
        }
        if (inputForm.tags.trim().length === 0) {
            Alert.alert("Invalid input", "Tag should not be empty.");
            return;
        }
        setShowLoading(true);
        const input = new TaskInput(
            inputForm.task,
            inputForm.type,
            inputForm.operation,
            inputForm.tags,
            inputForm.value,
        );
        await addTask(input);
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

    useEffect(() => {
        if (searchText.length > 2) {
            console.log("Search text changed:", searchText);
            fetchSuggestionsTaks(searchText)
                .then((suggestions) => {
                    console.log("Suggestions fetched:", suggestions);
                    setSuggestions(suggestions);
                })
                .catch((error) => {
                });
        }
    }, [searchText]);

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
                    value: searchText,
                    returnKeyType: "next",
                    onSubmitEditing: () => {
                        tagRef.current?.focus();
                    },
                    onChangeText: setSearchText,
                }} />
                {suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text>{item.task}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                <NewTaskTextInput
                    textInputConfig={{
                        label: "Tags *",
                        mode: "outlined",
                        placeholder: "Add a tag",
                        value: inputForm.tags,
                        ref: tagRef,
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