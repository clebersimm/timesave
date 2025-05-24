import TaskTypeEnum from "@/src/shared/TaskTypeEnum";
import { Icon } from "react-native-paper";

export default function TaskTypeIcon({ type }: { type: TaskTypeEnum }) {
    let iconName = "play-circle-outline";
    let iconColor = "gray";

    switch (type) {
        case TaskTypeEnum.ACTION:
            iconName = "play";
            break;
        case TaskTypeEnum.TIME:
            iconName = "clock";
            break;
        default:
            iconName = "play";
    }

    return (
        <Icon
            source={iconName}
            color={iconColor}
            size={24}
        />
    );
}