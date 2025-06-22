import OperationEnum from "../shared/OperationEnum";
import StatusEnum from "../shared/StatusEnum";
import TaskTypeEnum from "../shared/TaskTypeEnum";
import TaskRepository, {  Task, TaskHistory } from "./TaskRepository";

export class TaskRepositoryImpl implements TaskRepository {
    
    private _taskHistory: TaskHistory[] = [];

    private _tasks: Task[] = [
        new Task(1, "Task 1", StatusEnum.PENDING, new Date(), new Date(), TaskTypeEnum.TIME, OperationEnum.CREDIT, "work", undefined, undefined),
        new Task(2, "Task 2", StatusEnum.COMPLETED, new Date(), new Date(), TaskTypeEnum.TIME, OperationEnum.CREDIT, "work", 20, undefined),
    ];

    async getTasks(): Promise<Task[]> {
        const filteredTask = this._tasks.filter(task =>
            [StatusEnum.PENDING, StatusEnum.ONGOING, StatusEnum.STOPED].includes(task.status)
        );
        return filteredTask;
    }

    async getCompletedTasks(): Promise<Task[]> {
        const filteredTask = this._tasks.filter(task =>
            [StatusEnum.COMPLETED].includes(task.status)
        );
        return filteredTask;
    }

    async getTaskById(id: number): Promise<Task | null> {
        const filteredTask = this._tasks.filter(task => task.id === id);
        if (filteredTask.length === 0) {
            return null;
        }
        return filteredTask[0];
    }
    async addTask(task: Task): Promise<number> {
        task.setId = this._tasks.length + 1;
        this._tasks.push(task);
        return task.id;
    }
    async updateTask(task: Task): Promise<Task> {
        this._tasks = this._tasks.filter(t => t.id !== task.id);
        this._tasks.push(task);
        return task;
    }
    async deleteTask(taskId: number): Promise<void> {
        this._tasks = this._tasks.filter(task => task.id !== taskId);
        console.log("deleted task ",this._tasks);
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

    async getTotalCredit(operation: OperationEnum): Promise<number> {
        const filteredTask = this._tasks.filter(task => (task.operation === operation && task.status === StatusEnum.COMPLETED));
        if (filteredTask.length === 0) {
            return 0;
        }
        let total = 0;
        filteredTask.forEach(task => {
            if (task.value) {
                total += Number(task.value);
            }
        }
        );
        return total;
    }

}