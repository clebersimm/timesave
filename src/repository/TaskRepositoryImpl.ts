import TaskRepository, { Task } from "./TaskRepository";

export class TaskRepositoryImpl implements TaskRepository {
    
    private _tasks: Task[] = [
        {
            id: 1,
            task: "Task Alpha",
            status: 0,
            status_description: "Pending",
            created_at: "2023-01-01T10:00:00Z",
            updated_at: "2023-01-02T12:00:00Z",
            deleted_at: "",
            type: "General",
            operation: 1,
            value: 100,
            tag: "Work"
        },
        {
            id: 2,
            task: "Task Beta",
            status: 1,
            status_description: "Going",
            created_at: "2023-02-01T09:30:00Z",
            updated_at: "2023-02-03T11:00:00Z",
            deleted_at: "",
            type: "Urgent",
            operation: 2,
            value: 200,
            tag: "Personal"
        },
        {
            id: 3,
            task: "Task Gamma",
            status: 0,
            status_description: "Pending",
            created_at: "2023-03-01T08:15:00Z",
            updated_at: "2023-03-02T10:45:00Z",
            deleted_at: "",
            type: "General",
            operation: 3,
            value: 300,
            tag: "Health"
        },
        {
            id: 4,
            task: "Task Delta",
            status: 2,
            status_description: "Stoped",
            created_at: "2023-04-01T07:45:00Z",
            updated_at: "2023-04-05T09:30:00Z",
            deleted_at: "2023-04-10T10:00:00Z",
            type: "Critical",
            operation: 4,
            value: 400,
            tag: "Finance"
        },
        {
            id: 5,
            task: "Task Epsilon",
            status: 3,
            status_description: "Completed",
            created_at: "2023-05-01T06:30:00Z",
            updated_at: "2023-05-03T08:00:00Z",
            deleted_at: "",
            type: "Optional",
            operation: 5,
            value: 500,
            tag: "Leisure"
        }
    ];

    async getTasks(): Promise<Task[]> {
        return this._tasks;
    }
    async getTaskById(id: number): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    async addTask(task: Task): Promise<void> {
        this._tasks.push(task);
    }
    async updateTask(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteTask(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}