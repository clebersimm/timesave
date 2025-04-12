enum OperationEnum {
    CREDIT = "Credit",
    DEBIT = "Debit",
}

export class OperationEnumUtils {
    static getOperationEnum(value: string): OperationEnum | undefined {
        return Object.values(OperationEnum).find((type) => type === value);
    }

}

export default OperationEnum;
