import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, MD2Colors, Text } from "react-native-paper";
import { SelectTypeParameter } from "./SelectTypeParameter";

interface ConfigProps {
    onValueChangeHandler: Function;
    value1: SelectTypeParameter;
    value2: SelectTypeParameter;
    title: string;
}

export default function SelectTwoParameterTypeInput({
    value1,
    value2,
    title,
    onValueChangeHandler }: ConfigProps) {

    const [selectedValue, setSelectedValue] = useState<string>();

    const handleValueChange = (newValue: string) => {
        setSelectedValue(newValue);
        onValueChangeHandler(newValue);
    };

    return (
        <View style={{ marginVertical: 8, gap: 8, paddingLeft: 8, paddingRight: 8 }}>
            <Text variant="titleMedium">{title}</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}>
                <TouchableOpacity
                    style={selectedValue === value1.value ? { borderWidth: 1, borderColor: value1.color, borderRadius: 8 } : {}}
                    onPress={() => handleValueChange(value1.value)}>
                    <View style={{ alignItems: "center", flexDirection: "column", gap: 8 }}>
                        <Icon source={value1.icon} color={value1.color} size={48} />
                        <Text>{value1.title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={selectedValue === value2.value ? { borderWidth: 1, borderColor: value2.color, borderRadius: 8 } : {}}
                    onPress={() => handleValueChange(value2.value)}>
                    <View style={{ alignItems: "center", flexDirection: "column", gap: 8 }}>
                        <Icon source={value2.icon} color={value2.color} size={48} />
                        <Text>{value2.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}