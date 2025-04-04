import { Link } from "expo-router";
import { List } from "react-native-paper";
import ActionButton from "./ActionButton";
import StatusEnum from "@/src/shared/StatusEnum";

export interface TodoTableItemProps {
    item: {
        key: number;
        task: string;
        status: StatusEnum;
        tag: string;
    };
    onPress: () => void;
};

export function TodoTableItem({ item, onPress }: TodoTableItemProps) {
    return (
        <Link href={{
            pathname: '/task/[id]',
            params: { id: item.key }
        }}>
            <List.Item
                key={item.key}
                title={item.task}
                description={item.tag}
                style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
                descriptionStyle={{ fontSize: 14, color: '#666' }}
                right={() => (
                    <ActionButton
                        status={item.status}
                        onPress={onPress}
                    />
                )}
                titleNumberOfLines={5}
                descriptionNumberOfLines={1}
                titleEllipsizeMode="tail"
                descriptionEllipsizeMode="tail"
            />
        </Link>
    );
};