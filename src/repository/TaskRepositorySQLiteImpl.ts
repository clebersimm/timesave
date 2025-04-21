import OperationEnum from "../shared/OperationEnum";
import { checkDatabase, initDatabase } from "./database";
import TaskRepository, { Task, TaskHistory } from "./TaskRepository";


export class TaskRepositorySQLiteImpl implements TaskRepository {

    

    constructor() {
        initDatabase();
        checkDatabase();
    }

    getTasks(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    getTaskById(id: number): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    addTask(task: Task): Promise<number> {
        throw new Error("Method not implemented.");
    }
    updateTask(task: Task): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    deleteTask(id: number): Promise<void>;
    deleteTask(taskId: number): Promise<void>;
    deleteTask(taskId: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
    existsTask(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addTaskHistory(taskHistory: TaskHistory): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTaskHistoryByTaskId(taskId: number): Promise<TaskHistory[] | null> {
        throw new Error("Method not implemented.");
    }
    findLastTaskHistoryByTaskId(taskId: number): Promise<TaskHistory | null> {
        throw new Error("Method not implemented.");
    }
    getTotalCredit(operation: OperationEnum): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getCompletedTasks(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
}
