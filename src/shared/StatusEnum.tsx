enum StatusEnum {
    PENDING = "Pending",
    ONGOING = "On Going",
    STOPED = "Stoped",
    COMPLETED = "Completed"
}

export class StatusEnumUtils {
    static getStatusEnum(status: string): StatusEnum | undefined {
        switch (status) {
            case StatusEnum.PENDING:
                return StatusEnum.PENDING;
            case StatusEnum.ONGOING:
                return StatusEnum.ONGOING;
            case StatusEnum.STOPED:
                return StatusEnum.STOPED;
            case StatusEnum.COMPLETED:
                return StatusEnum.COMPLETED;
            default:
                return undefined;
        }
    }
    static getStatusEnumString(status: StatusEnum): string {
        switch (status) {
            case StatusEnum.PENDING:
                return "Pending";
            case StatusEnum.ONGOING:
                return "On Going";
            case StatusEnum.STOPED:
                return "Stoped";
            case StatusEnum.COMPLETED:
                return "Completed";
            default:
                return "";
        }
    }
}

export default StatusEnum;
