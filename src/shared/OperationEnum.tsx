enum OperationEnum {
    CREDIT = "Credit",
    DEBIT = "Debit",
}

export class OperationEnumUtils {
    static getOperationEnum(value: number): OperationEnum | undefined {
        const statusKeys = Object.keys(OperationEnum).filter((key) => isNaN(Number(key)));
        const statusValues = statusKeys.map((key) => OperationEnum[key as keyof typeof OperationEnum]);
        return statusValues[value];
    }
}

export default OperationEnum;
