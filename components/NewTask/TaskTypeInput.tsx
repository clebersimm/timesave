import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

interface RadioButtonConfigProps {
    onValueChangeHandler: Function;
    value: TaskTypeEnum;
}

export default function TaskTypeInput({ value, onValueChangeHandler }: RadioButtonConfigProps) {
    return (
        <View style={{ marginVertical: 8, gap: 8, paddingLeft: 8, paddingRight: 8 }}>
            <Text variant="titleMedium">Task Type</Text>
            <SegmentedButtons
                value={value}
                onValueChange={(newValue) => onValueChangeHandler(newValue)}
                buttons={[
                    {
                        value: TaskTypeEnum.TIME,
                        label: TaskTypeEnum.TIME,
                        icon: "clock",
                    },
                    {
                        value: TaskTypeEnum.ACTION,
                        label: TaskTypeEnum.ACTION,
                        icon: "play",
                    },
                ]}
            />
        </View>
    );
}