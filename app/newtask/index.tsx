import Loading from "@/components/Loading/Loading";
import NewTaskHeader from "@/components/NewTask/Header";
import NewTaskTextInput from "@/components/NewTask/NewTaskTextInput";
import SelectTwoParameterTypeInput from "@/components/SelectTypeInput/SelectTwoParameterTypeInput";
import { useTaskContext } from "@/src/context/TaskContext";
import { Task } from "@/src/repository/TaskRepository";
import { TaskInput } from "@/src/services/TaskService";
import OperationEnum from "@/src/shared/OperationEnum";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { MD2Colors, Text } from "react-native-paper";

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
    const [tagtext, setTagText] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Task[]>([]);
    const [suggestionSelected, setSuggestionSelected] = useState<Task | null>(null);

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
        if (searchText.trim().length === 0) {
            Alert.alert("Invalid input", "Task name should not be empty.");
            return;
        }
        if (inputForm.tags.trim().length === 0) {
            Alert.alert("Invalid input", "Tag should not be empty.");
            return;
        }
        setShowLoading(true);
        const input = new TaskInput(
            searchText,
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
        if (searchText.length > 2 && suggestionSelected?.task !== searchText) {
            fetchSuggestionsTaks(searchText)
                .then((suggestions) => {
                    setSuggestions(suggestions);
                })
                .catch((error) => {
                });
        } else {
            setSuggestions([]);
        }
    }, [searchText]);

    function handleSuggestionSelect(suggestion: Task) {
        setInputForm((currentInputForm) => {
            return {
                ...currentInputForm,
                task: suggestion.task,
                tags: suggestion.tags,
            };
        });
        setSearchText(suggestion.task);
        setSuggestionSelected(suggestion);
        setSuggestions([]);
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
                    value: searchText,
                    returnKeyType: "next",
                    onSubmitEditing: () => {
                        tagRef.current?.focus();
                    },
                    onChangeText: setSearchText,
                }} />
                {suggestions.length > 0 && (
                    <View>
                        <Text style={{ marginLeft: 4, marginBottom: 4, fontSize: 16 }}>
                            Suggestions
                        </Text>
                        <FlatList
                            data={suggestions}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
                                    <View style={{
                                        flex: 1,
                                        padding: 8,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 4
                                    }}>
                                        <Text style={{ flexShrink: 1, flexWrap: 'wrap', fontWeight: 'bold' }}>Task:</Text>
                                        <Text>{item.task}</Text>
                                        <Text style={{ flexShrink: 1, flexWrap: 'wrap', fontWeight: 'bold' }}> Tags:</Text>
                                        <Text>{item.tags}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>)
                }
                <NewTaskTextInput
                    textInputConfig={{
                        label: "Tags *",
                        mode: "outlined",
                        placeholder: "Add a tag",
                        value: inputForm.tags,
                        ref: tagRef,
                        onChangeText: inputChagedHandler.bind(this, "tags"),
                    }}
                />
                <SelectTwoParameterTypeInput
                    value1={{ value: TaskTypeEnum.TIME, icon: "clock", title: "Time", color: MD2Colors.green500 }}
                    value2={{ value: TaskTypeEnum.ACTION, icon: "play", title: "Action", color: MD2Colors.blue500 }}
                    title="Select Task Type"
                    onValueChangeHandler={(newValue: TaskTypeEnum) => changeValueHandler("type", newValue)}
                />
                {ValueInput}
                <SelectTwoParameterTypeInput
                    value1={{ value: OperationEnum.CREDIT, icon: "plus", title: "Credit", color: MD2Colors.green500 }}
                    value2={{ value: OperationEnum.DEBIT, icon: "minus", title: "Debit", color: MD2Colors.red500 }}
                    title="Select Operation Type"
                    onValueChangeHandler={(newValue: OperationEnum) => changeValueHandler("operation", newValue)}
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