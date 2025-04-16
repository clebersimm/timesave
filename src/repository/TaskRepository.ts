export default interface TaskRepository {
    getTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task | null>;
    addTask(task: Task): Promise<void>;
    updateTask(task: Task): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    existsTask(id: number): Promise<boolean>;
}

export class Task {
    constructor(
        readonly id: number,
        readonly task: string,
        readonly status: string,
        readonly created_at: string,
        readonly updated_at: string,
        readonly type: string,
        readonly operation: string,
        readonly tags: string,
        readonly deleted_at?: string,
        readonly value?: number,
    ) { }
}