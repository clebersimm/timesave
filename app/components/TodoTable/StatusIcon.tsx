import StatusEnum from '@/src/shared/StatusEnum';
import { Icon, MD3Colors } from 'react-native-paper';

export interface StatusIconProps {
    status: StatusEnum
}

export default function StatusIcon({ status }: StatusIconProps) {
    var icon = "camera";
    var iconColor = MD3Colors.error0;
    switch (status) {
        case StatusEnum.PENDING:
            icon = "play";
            iconColor = 'green';
            break;
        case StatusEnum.ONGOING:
            icon = "stop";
            iconColor = 'blue';
            break;
        case StatusEnum.STOPED:
            icon = "play-circle-outline";
            iconColor = 'red';
            break;
        default:
            icon = "play";
            iconColor = 'green';
    }

    return (
        <Icon
            source={icon}
            color={iconColor}
            size={25}
        />
    )
}