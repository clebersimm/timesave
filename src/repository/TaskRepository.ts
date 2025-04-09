export default interface TaskRepository {
    getTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task | null>;
    addTask(task: Task): Promise<void>;
    updateTask(task: Task): Promise<void>;
    deleteTask(id: number): Promise<void>;
}

export class Task {
    constructor(
        readonly id: number,
        readonly task: string,
        readonly status: number,
        readonly status_description: string,
        readonly created_at: string,
        readonly updated_at: string,
        readonly deleted_at: string,
        readonly type: string,
        readonly operation: number,
        readonly value: number,
        readonly tag: string
    ) { }
}