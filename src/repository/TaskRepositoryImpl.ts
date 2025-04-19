import TaskRepository, { Task, TaskHistory } from "./TaskRepository";

export class TaskRepositoryImpl implements TaskRepository {


    private _tasks: Task[] = [];
    private _taskHistory: TaskHistory[] = [];

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
    async updateTask(task: Task): Promise<Task> {
        this._tasks = this._tasks.filter(t => t.id !== task.id);
        this._tasks.push(task);
        return task;
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
    async addTaskHistory(taskHistory: TaskHistory): Promise<void> {
        this._taskHistory.push(taskHistory);
    }
    async getTaskHistoryByTaskId(taskId: number): Promise<TaskHistory[] | null> {
        this._taskHistory = this._taskHistory.filter(task => task.task_id === taskId);
        if (this._taskHistory.length === 0) {
            return null;
        }
        this._taskHistory = this._taskHistory.sort((a, b) => {
            return a.updated_at.getTime() - b.updated_at.getTime();
        });
        return this._taskHistory;
    }

    async findLastTaskHistoryByTaskId(taskId: number): Promise<TaskHistory | null> {
        this._taskHistory = this._taskHistory.filter(task => task.task_id === taskId);
        if (this._taskHistory.length === 0) {
            return null;
        }
        this._taskHistory = this._taskHistory.sort((a, b) => {
            return a.updated_at.getTime() - b.updated_at.getTime();
        });
        return this._taskHistory[this._taskHistory.length - 1];
    }

    async getTotalCredit(): Promise<number> {
        this._tasks = this._tasks.filter(task => task.type === "CREDIT");
        if (this._tasks.length === 0) {
            return 0;
        }
        let total = 0;
        this._tasks.forEach(task => {
            if (task.value) {
                total += task.value;
            }
        }
        );
        return total;
    }

}