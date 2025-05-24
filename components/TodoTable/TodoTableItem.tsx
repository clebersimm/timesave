import { Link } from "expo-router";
import { Text } from "react-native-paper";
import ActionButton from "./ActionButton";
import { TaskOutput } from "@/src/services/TaskService";
import { StyleSheet, View } from "react-native";
import TaskTypeIcon from "./TaskTypeIcon";

export interface TodoTableItemProps {
    item: TaskOutput,
    onPress: () => void;
};

export function TodoTableItem({ item, onPress }: TodoTableItemProps) {
    return (
        <Link href={{
            pathname: '/task/[id]',
            params: { id: item.id }
        }}>
            <View style={style.taskContainer}>
                <View style={style.taskHeader}>
                    <Text style={style.taskTitle}>{item.id}</Text>
                </View>
                <View style={style.taskInnerContainer}>
                    <View style={style.taskContent}>
                        <Text>{item.task}</Text>
                        <Text>{item.tags}</Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <TaskTypeIcon type={item.type} />
                            <Text>{item.status}</Text>
                        </View>
                    </View>
                    <View>
                        <ActionButton
                            status={item.status}
                            onPress={onPress}
                        />
                    </View>
                </View>
            </View>
        </Link>

    );
};

const style = StyleSheet.create({
    taskContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 8,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    taskHeader: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    taskContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        gap: 4,
    },
});