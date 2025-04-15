import TaskRepository, { Task } from "./TaskRepository";

export class TaskRepositoryImpl implements TaskRepository {


    private _tasks: Task[] = [];

    async getTasks(): Promise<Task[]> {
        return this._tasks;
    }
    async getTaskById(id: number): Promise<Task | null> {
        this._tasks = this._tasks.filter(task => task.id === id);
        if (this._tasks.length === 0) {
            return null;
        }
        return this._tasks[0];
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
    async existsTask(id: number): Promise<boolean> {
        this._tasks = this._tasks.filter(task => task.id === id);
        if (this._tasks.length === 0) {
            return false;
        }
        return true;
    }

}