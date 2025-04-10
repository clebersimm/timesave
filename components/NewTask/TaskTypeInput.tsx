import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import RadioGroupInput from "./RadioGroupInput";

export default function TaskTypeInput() {
    return (
        <RadioGroupInput>
            <Text variant="titleMedium">Task Type</Text>
            <RadioButton.Group
                onValueChange={value => console.log(value)}
                value="first">
                <View>
                    <Text>{TaskTypeEnum.ACTION}</Text>
                    <RadioButton.Item label={TaskTypeEnum.ACTION} value="first" />
                </View>
                <View>
                    <Text>{TaskTypeEnum.TIME}</Text>
                    <RadioButton.Item label={TaskTypeEnum.TIME} value="second" />
                </View>
            </RadioButton.Group>
        </RadioGroupInput>
    );
}