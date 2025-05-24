import StatusEnum from "@/src/shared/StatusEnum";
import { TouchableOpacity } from "react-native";
import { Button, Icon, MD3Colors } from "react-native-paper";

export interface ActionButtonProps {
    status: StatusEnum;
    onPress: Function;
};

export default function ActionButton({ status, onPress }: ActionButtonProps) {
    var icon = "play-circle-outline";
    var iconColor = MD3Colors.error0;
    switch (status) {
        case StatusEnum.PENDING:
            icon = "play-circle-outline";
            iconColor = 'green';
            break;
        case StatusEnum.ONGOING:
            icon = "stop-circle-outline";
            iconColor = 'blue';
            break;
        case StatusEnum.STOPED:
            icon = "play-circle-outline";
            iconColor = 'red';
            break;
        default:
            icon = "play-circle-outline";
            iconColor = 'green';
    }

    return (
        <TouchableOpacity onPress={() => onPress()} style={{ padding: 0 }}>
            <Icon
            source={icon}
            color={iconColor}
            size={32}
            />
        </TouchableOpacity>
    );
}