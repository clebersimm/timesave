import { TaskOutput } from "@/src/services/TaskService";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type DetailsDataProps = {
    data: TaskOutput | null;
};

export default function DetailsData({ data }: DetailsDataProps) {
    return (<>
        <View>
            <Text>Task: {data?.task}</Text>
        </View>
        <View>
            <Text>Status: {data?.status}</Text>
        </View>
        <View>
            <Text>Created At: {data?.createdAt}</Text>
        </View>
        <View>
            <Text>Type: {data?.type}</Text>
        </View>
        <View>
            <Text>Operation: {data?.operation}</Text>
        </View>
    </>)
}