import { Link } from "expo-router";
import { Card, List, Text } from "react-native-paper";
import ActionButton from "./ActionButton";
import { TaskOutput } from "@/src/services/TaskService";
import { StyleSheet, View } from "react-native";

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
                <Text>{item.id}</Text>
                <Text>{item.task}</Text>
            </View>
            {
                /*
            <List.Item
                key={item.id}
                title={item.task}
                description={item.tags}
                style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
                descriptionStyle={{ fontSize: 14, color: '#666' }}
                titleNumberOfLines={5}
                descriptionNumberOfLines={1}
                titleEllipsizeMode="tail"
                descriptionEllipsizeMode="tail"
                right={() => <ActionButton
                    status={item.status}
                    onPress={onPress}
                />}
            />
            */
            }
        </Link>

    );
};

const style = StyleSheet.create({
    taskContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        width: '95%',
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
});