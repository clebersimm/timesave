enum TaskTypeEnum {
    TIME = 'Time',
    ACTION = 'Action',
};

export class TaskTypeEnumUtils {
    static getTaskTypeEnum(value: string): TaskTypeEnum | undefined {
        return Object.values(TaskTypeEnum).find((type) => type === value);
    }
}

export default TaskTypeEnum;