import OperationEnum from "../shared/OperationEnum";
import StatusEnum from "../shared/StatusEnum";
import TaskTypeEnum from "../shared/TaskTypeEnum";

export default interface TaskRepository {
    getTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task | null>;
    addTask(task: Task): Promise<number>;
    updateTask(task: Task): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    addTaskHistory(taskHistory: TaskHistory): Promise<void>;
    getTaskHistoryByTaskId(taskId: number): Promise<TaskHistory[] | null>;
    findLastTaskHistoryByTaskId(taskId: number): Promise<TaskHistory | null>;
    getTotalCredit(operation: OperationEnum): Promise<number>;
    getCompletedTasks(): Promise<Task[]>;
    deleteTask(taskId: number): Promise<void>;
}

export class Task {
    private _id: number;
    constructor(
        id: number = 0,
        readonly task: string,
        readonly status: StatusEnum,
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

    get id(): number {
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
    get getUpdatedAt(): string {
        return new Date(this.updated_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
};