import { Link } from "expo-router";
import { List } from "react-native-paper";
import ActionButton from "./ActionButton";
import StatusEnum from "@/src/shared/StatusEnum";
import { TaskOutput } from "@/src/services/TaskService";
import { View } from "react-native";


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
            <List.Item
                key={item.id}
                title={item.task}
                description={item.tag}
                style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
                descriptionStyle={{ fontSize: 14, color: '#666' }}
                titleNumberOfLines={5}
                descriptionNumberOfLines={1}
                titleEllipsizeMode="tail"
                descriptionEllipsizeMode="tail"
                right={() => <ActionButton
                    status={item.getStatusTask()}
                    onPress={onPress}
                />}
            />
        </Link>

    );
};