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
        const db = await this.getDBConnection();
        try {
            const query = `SELECT * FROM task WHERE status <> ? AND deleted_at IS NULL`;
            const params = [StatusEnum.COMPLETED];
            const tasks = await db.getAllAsync<Task>(query, params);
            return tasks;
        } catch (error) {
            console.error("Error getting tasks:", error);
        } finally {
            //await db.closeAsync();
        }
        return [];
    }
    async getTaskById(taskId: number): Promise<Task | null> {
        const db = await this.getDBConnection();
        console.log("taskId", taskId);
        console.log("db", db);
        try {
            const query = `SELECT * FROM task WHERE id = ?`;
            const params = [taskId];
            const task = await db.getFirstAsync<Task>(query, params);
            return task;
        } catch (error) {
            console.error("Error getting tasks:", error);
        } finally {
            // await db.closeAsync();
        }
        return null;
    }
    async addTask(task: Task): Promise<number> {
        const db = await this.getDBConnection();
        try {
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
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            await db.closeAsync();
        }
        return -1;
    }

    async updateTask(task: Task): Promise<Task> {
        const db = await this.getDBConnection();
        try {
            const query = `UPDATE task SET task = ?, 
                            status = ?, 
                            updated_at = ?, 
                            type = ?, 
                            operation = ?, 
                            tags = ?, 
                            value = ? 
                            WHERE id = ?`;
            const params = [
                task.task,
                task.status,
                task.updated_at.getTime(),
                task.type,
                task.operation,
                task.tags,
                task.value ? task.value : 0,
                task.id
            ];
            await db.runAsync(query, params);
            return task;
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            await db.closeAsync();
        }
        return task;
    }

    async deleteTask(taskId: number): Promise<void> {
        const db = await this.getDBConnection();
        try {
            const query = `DELETE FROM task WHERE id = ?`;
            const params = [taskId];
            await db.runAsync(query, params);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            await db.closeAsync();
        }
    }

    async addTaskHistory(taskHistory: TaskHistory): Promise<void> {
        const db = await this.getDBConnection();
        try {
            const query = `INSERT INTO task_history (task_id, status, updated_at) 
                            VALUES (?, ?, ?)`;
            const params = [
                taskHistory.task_id,
                taskHistory.status,
                taskHistory.updated_at.getTime()
            ];
            await db.runAsync(query, params);
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            await db.closeAsync();
        }
    }
    async getTaskHistoryByTaskId(taskId: number): Promise<TaskHistory[] | null> {
        const db = await this.getDBConnection();
        try {
            const query = `SELECT * FROM task_history WHERE task_id = ? order by id desc`;
            const params = [taskId];
            const tasks = await db.getAllAsync<TaskHistory>(query, params);
            return tasks;
        } catch (error) {
            console.error("Error getting tasks history:", error);
        } finally {
            //await db.closeAsync();
        }
        return [];
    }
    async findLastTaskHistoryByTaskId(taskId: number): Promise<TaskHistory | null> {
        const db = await this.getDBConnection();
        try {
            const query = `SELECT * FROM task_history WHERE id = ? order by id desc`;
            const params = [taskId];
            const taskHistory = await db.getAllAsync<TaskHistory>(query, params);
            console.log("taskHistory", taskHistory);
            return taskHistory[0];
        } catch (error) {
            console.error("Error getting tasks:", error);
        } finally {
            // await db.closeAsync();
        }
        return null;
    }
    async getTotalCredit(operation: OperationEnum): Promise<number> {
        const db = await this.getDBConnection();
        try {
            const query = `SELECT SUM(value) as total FROM task WHERE operation = ? AND status = ?`;
            const params = [operation, StatusEnum.COMPLETED];
            const result = await db.getFirstAsync<{ total: number }>(query, params);
            return result?.total || 0;
        } catch (error) {
            console.error("Error getting total credit:", error);
        } finally {
            //await db.closeAsync();
        }
        return 0;
    }
    async getCompletedTasks(): Promise<Task[]> {
        const db = await this.getDBConnection();
        try {
            const query = `SELECT * FROM task WHERE where status = ? order by updated_at desc`;
            const params = [StatusEnum.COMPLETED];
            const tasks = await db.getAllAsync<Task>(query, params);
            return tasks;
        } catch (error) {
            console.error("Error getting tasks history:", error);
        } finally {
            //await db.closeAsync();
        }
        return [];
    }
}
