import OperationEnum from "@/src/shared/OperationEnum";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import RadioGroupInput from "./RadioGroupInput";

export default function OperationInput() {
    return (
        <RadioGroupInput>
            <View>
                <Text variant="titleMedium">Operation</Text>
            </View>
            <RadioButton.Group onValueChange={value => console.log(value)} value={OperationEnum.CREDIT}>
                <View>
                    <Text>{OperationEnum.CREDIT}</Text>
                    <RadioButton.Item label={OperationEnum.CREDIT} value={OperationEnum.CREDIT} />
                </View>
                <View>
                    <Text>{OperationEnum.DEBIT}</Text>
                    <RadioButton.Item label={OperationEnum.DEBIT} value={OperationEnum.DEBIT} />
                </View>
            </RadioButton.Group>
        </RadioGroupInput>
    );
}
