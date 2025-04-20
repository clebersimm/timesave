import OperationEnum from "../shared/OperationEnum";
import TaskTypeEnum from "../shared/TaskTypeEnum";

export default interface TaskRepository {
    getTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task | null>;
    addTask(task: Task): Promise<number>;
    updateTask(task: Task): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    existsTask(id: number): Promise<boolean>;
    addTaskHistory(taskHistory: TaskHistory): Promise<void>;
    getTaskHistoryByTaskId(taskId: number): Promise<TaskHistory[] | null>;
    findLastTaskHistoryByTaskId(taskId: number): Promise<TaskHistory | null>;
    getTotalCredit(): Promise<number>;
}

export class Task {
    private _id: number;
    constructor(
        id: number = 0,
        readonly task: string,
        readonly status: string,
        readonly created_at: Date,
        readonly updated_at: Date,
        readonly type: TaskTypeEnum,
        readonly operation: OperationEnum,
        readonly tags: string,
        readonly value?: number,
        readonly deleted_at?: Date,
    ) {
        this._id = id;
    }

    get getId(): number {
        return this._id;
    }
    set setId(value: number) {
        this._id = value;
    }
}

export class TaskHistory {
    constructor(
        readonly id: number,
        readonly task_id: number,
        readonly status: string,
        readonly updated_at: Date,
    ) { }
};