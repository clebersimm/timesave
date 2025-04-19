import { TaskOutput } from "@/src/services/TaskService";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type DetailsDataProps = {
    data: TaskOutput | null;
};

export default function DetailsData({ data }: DetailsDataProps) {
    if (!data) {
        return <></>;
    }
    let valueText = <></>
    if (data.type === TaskTypeEnum.ACTION) {
        valueText = (<View>
            <Text>Value: {data.value}</Text></View>)
    }
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
        {valueText}
        <View>
            <Text>Operation: {data?.operation}</Text>
        </View>
    </>)
}