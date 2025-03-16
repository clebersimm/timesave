import StatusEnum from '@/src/shared/StatusEnum';
import { Icon, MD3Colors } from 'react-native-paper';

export interface StatusIconProps {
    status: StatusEnum
}

export default function StatusIcon({ status }: StatusIconProps) {
    var icon = "camera";
    switch (status) {
        case StatusEnum.PENDING:
            icon = "play";
            break;
        case StatusEnum.ONGOING:
            icon = "stop";
            break;
        case StatusEnum.STOPED:
            icon = "play-circle-outline";
            break;
        default:
            icon = "play";
    }

    return (
        <Icon
            source={icon}
            color={MD3Colors.error0}
            size={20}
        />
    )
}