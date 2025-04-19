export default interface TaskRepository {
    getTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task | null>;
    addTask(task: Task): Promise<void>;
    updateTask(task: Task): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    existsTask(id: number): Promise<boolean>;
    addTaskHistory(taskHistory: TaskHistory): Promise<void>;
    getTaskHistoryByTaskId(taskId: number): Promise<TaskHistory[] | null>;
    findLastTaskHistoryByTaskId(taskId: number): Promise<TaskHistory | null>;
}

export class Task {
    constructor(
        readonly id: number,
        readonly task: string,
        readonly status: string,
        readonly created_at: Date,
        readonly updated_at: Date,
        readonly type: string,
        readonly operation: string,
        readonly tags: string,
        readonly deleted_at?: Date,
        readonly value?: number,
    ) { }
}

export class TaskHistory {
    constructor(
        readonly id: number,
        readonly task_id: number,
        readonly status: string,
        readonly updated_at: Date,
    ) { }
};