import { TaskOutput } from "@/src/services/TaskService";
import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { StyleSheet, View } from "react-native";
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
    return (<View style={style.container}>
        <View style={style.textContainer}>
            <Text style={style.label}>Task:</Text>
            <Text style={style.text}>{data?.task}</Text>
        </View>
        <View style={style.textContainer}>
            <Text style={style.label}>Status:</Text>
            <Text style={style.text}>{data?.status}</Text>
        </View>
        <View style={style.textContainer}>
            <Text style={style.label}>Created At:</Text>
            <Text style={style.text}>{data?.createdAt}</Text>
        </View>
        <View style={style.textContainer}>
            <Text style={style.label}>Type:</Text>
            <Text style={style.text}>{data?.type}</Text>
        </View>
        {valueText}
        <View style={style.textContainer}>
            <Text style={style.label}>Operation:</Text>
            <Text style={style.text}>{data?.operation}</Text>
        </View>
    </View>)
}

const style = StyleSheet.create({
    container: {
        gap: 8,
        flexDirection: "column",
    },
    textContainer: {
        flexDirection: "row",
    },
    label: {
        fontWeight: "bold",
        marginRight: 8,
        fontSize: 16,    
    },
    text: {
        fontSize: 16,
        width: "90%",
    }
});