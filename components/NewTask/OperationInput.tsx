import OperationEnum from "@/src/shared/OperationEnum";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

interface RadioButtonConfigProps {
    onValueChangeHandler: Function;
    value: OperationEnum;
}

export default function OperationInput({ value, onValueChangeHandler }: RadioButtonConfigProps) {
    return (
        <View style={{ marginVertical: 8, gap: 8, paddingLeft: 8, paddingRight: 8 }}>
            <Text variant="titleMedium">Operation</Text>
            <SegmentedButtons
                value={value}
                onValueChange={(newValue) => onValueChangeHandler(newValue)}
                buttons={[
                    {
                        value: OperationEnum.CREDIT,
                        label: OperationEnum.CREDIT,
                        icon: "plus",
                    },
                    {
                        value: OperationEnum.DEBIT,
                        label: OperationEnum.DEBIT,
                        icon: "minus",
                    },
                ]}
            />
        </View>
    );
}
