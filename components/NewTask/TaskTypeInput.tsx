import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import RadioGroupInput from "./RadioGroupInput";

interface RadioButtonConfigProps {
    onValueChangeHandler: Function;
    value: TaskTypeEnum;
}

export default function TaskTypeInput({ value, onValueChangeHandler }: RadioButtonConfigProps) {
    return (
        <RadioGroupInput>
            <Text variant="titleMedium">Task Type</Text>
            <RadioButton.Group
                onValueChange={(newValue) => onValueChangeHandler(newValue)}
                value={value}>
                <View>
                    <Text>{TaskTypeEnum.TIME}</Text>
                    <RadioButton.Item
                        label={TaskTypeEnum.TIME}
                        value={TaskTypeEnum.TIME} />
                </View>
                <View>
                    <Text>{TaskTypeEnum.ACTION}</Text>
                    <RadioButton.Item
                        label={TaskTypeEnum.ACTION}
                        value={TaskTypeEnum.ACTION} />
                </View>
            </RadioButton.Group>
        </RadioGroupInput>
    );
}