import TaskRepository, { Task } from "./TaskRepository";

export class TaskRepositoryImpl implements TaskRepository {

    private _tasks: Task[] = [];

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