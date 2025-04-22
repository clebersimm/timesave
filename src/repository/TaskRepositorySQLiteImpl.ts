import OperationEnum from "../shared/OperationEnum";
import StatusEnum from "../shared/StatusEnum";
import { getDBConnection, initDatabase } from "./database";
import TaskRepository, { Task, TaskHistory } from "./TaskRepository";


export class TaskRepositorySQLiteImpl implements TaskRepository {

    constructor() {
        initDatabase();
    }

    async getDBConnection() {
        const db = await getDBConnection();
        return db;
    }

    async getTasks(): Promise<Task[]> {
        try {
            const db = await this.getDBConnection();
            const query = `SELECT * FROM task WHERE status <> ? AND deleted_at IS NULL`;
            const params = [StatusEnum.COMPLETED];
            const tasks = await db.getAllAsync<Task>(query, params);
            return tasks;
        } catch (error) {
            console.error("Error getting tasks:", error);

        }
        return [];
    }
    getTaskById(id: number): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    async addTask(task: Task): Promise<number> {
        const db = await this.getDBConnection();
        const query = `INSERT INTO task (task, 
        status, 
        created_at, 
        updated_at, 
        type, 
        operation, 
        tags, 
        value) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            task.task,
            task.status,
            task.created_at.getTime(),
            task.updated_at.getTime(),
            task.type,
            task.operation,
            task.tags,
            task.value ? task.value : 0
        ];
        const result = await db.runAsync(query, params);
        return result.lastInsertRowId;
    }
    updateTask(task: Task): Promise<Task> {
        throw new Error("Method not implemented.");
    }

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
