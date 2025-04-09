enum StatusEnum {
    PENDING = "Pending",
    ONGOING = "On Going",
    STOPED = "Stoped",
    COMPLETED = "Completed"
}

export class StatusEnumUtils {
    static getStatusEnum(value: number): StatusEnum | undefined {
        const statusKeys = Object.keys(StatusEnum).filter((key) => isNaN(Number(key)));
        const statusValues = statusKeys.map((key) => StatusEnum[key as keyof typeof StatusEnum]);
        return statusValues[value];
    }
}

export default StatusEnum;
