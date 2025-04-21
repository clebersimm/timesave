import TaskRepository, { Task } from "../repository/TaskRepository";
import { TaskRepositoryImpl } from "../repository/TaskRepositoryImpl";
import OperationEnum, { OperationEnumUtils } from "../shared/OperationEnum";
import StatusEnum, { StatusEnumUtils } from "../shared/StatusEnum";
import TaskTypeEnum, { TaskTypeEnumUtils } from "../shared/TaskTypeEnum";

export class TaskOutput {
    constructor(
        readonly id: number,
        readonly task: string,
        readonly status: StatusEnum,
        readonly created_at: Date,
        readonly updated_at: Date,
        readonly type: TaskTypeEnum,
        readonly operation: OperationEnum,
        readonly tags: string,
        readonly value?: number,
        readonly deleted_at?: Date,
    ) { }

    get createdAt(): string {
        return new Date(this.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    get updatedAt(): string {
        return new Date(this.updated_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

}

export class TaskHistoryOutput {
    constructor(
        readonly id: number,
        readonly task_id: number,
        readonly status: string,
        readonly updated_at: Date,
    ) { }

    get updatedAt(): string {
        return new Date(this.updated_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
};

export class TaskInput {
    constructor(
        readonly task: string,
        readonly type: TaskTypeEnum,
        readonly operation: OperationEnum,
        readonly tags: string,
        readonly value?: number,
    ) { }
}

export interface TaskServiceInterface {
    getTasks(): Promise<TaskOutput[]>;
    addTask(input: TaskInput): Promise<TaskOutput | null>;
    getTaskById(id: number): Promise<TaskOutput | null>;
    getTaskHistoryByTaskId(taskId: number): Promise<TaskHistoryOutput[] | null>;
    completeTask(id: number): Promise<TaskOutput | null>;
    getTotalCredit(): Promise<number>;
    getTotalDebit(): Promise<number>;
    getCompletedTasks(): Promise<TaskOutput[]>;
}

export class TaskServiceImpl implements TaskServiceInterface {

    private _taskRepository: TaskRepository;

    constructor() {
        this._taskRepository = new TaskRepositoryImpl();
    }

    async getTasks(): Promise<TaskOutput[]> {
        const tasks = await this._taskRepository.getTasks();
        return tasks.map(task => new TaskOutput(
            task.getId,
            task.task,
            StatusEnumUtils.getStatusEnum(task.status) ?? StatusEnum.PENDING,
            task.created_at,
            task.updated_at,
            TaskTypeEnumUtils.getTaskTypeEnum(task.type) ?? TaskTypeEnum.TIME,
            OperationEnumUtils.getOperationEnum(task.operation) ?? OperationEnum.CREDIT,
            task.tags,
            task.value,
            task.deleted_at,
        ));
    }

    async getCompletedTasks(): Promise<TaskOutput[]> {
        const tasks = await this._taskRepository.getCompletedTasks();
        console.log(tasks);
        return tasks.map(task => new TaskOutput(
            task.getId,
            task.task,
            StatusEnumUtils.getStatusEnum(task.status) ?? StatusEnum.PENDING,
            task.created_at,
            task.updated_at,
            TaskTypeEnumUtils.getTaskTypeEnum(task.type) ?? TaskTypeEnum.TIME,
            OperationEnumUtils.getOperationEnum(task.operation) ?? OperationEnum.CREDIT,
            task.tags,
            task.value,
            task.deleted_at,
        ));
    }

    async addTask(input: TaskInput): Promise<TaskOutput | null> {
        const task = new Task(
            0,
            input.task,
            StatusEnum.PENDING,
            new Date(),
            new Date(),
            input.type,
            input.operation,
            input.tags,
            input.value,
        );
        const taskId = await this._taskRepository.addTask(task);

        const newTaskOutput = new TaskOutput(
            taskId,
            task.task,
            StatusEnumUtils.getStatusEnum(task.status) ?? StatusEnum.PENDING,
            task.created_at,
            task.updated_at,
            TaskTypeEnumUtils.getTaskTypeEnum(task.type) ?? TaskTypeEnum.TIME,
            OperationEnumUtils.getOperationEnum(task.operation) ?? OperationEnum.CREDIT,
            task.tags,
            task.value
        );

        return newTaskOutput;

    }

    async getTaskById(id: number): Promise<TaskOutput | null> {
        const task = await this._taskRepository.getTaskById(id);
        if (!task) {
            return null;
        }
        return new TaskOutput(
            task.getId,
            task.task,
            StatusEnumUtils.getStatusEnum(task.status) ?? StatusEnum.PENDING,
            task.created_at,
            task.updated_at,
            TaskTypeEnumUtils.getTaskTypeEnum(task.type) ?? TaskTypeEnum.TIME,
            OperationEnumUtils.getOperationEnum(task.operation) ?? OperationEnum.CREDIT,
            task.tags,
            task.value,
            task.deleted_at,
        );
    }

    async getTaskHistoryByTaskId(taskId: number): Promise<TaskHistoryOutput[] | null> {
        if (taskId === undefined || taskId === null) {
            return null;
        }
        const taskHistory = await this._taskRepository.getTaskHistoryByTaskId(taskId);
        if (!taskHistory) {
            return null;
        }
        const reverseHistory = taskHistory.reverse();
        return reverseHistory.map(history => new TaskHistoryOutput(
            history.id,
            history.task_id,
            history.status,
            history.updated_at,
        ));
    }

    async executeTask(id: number): Promise<TaskOutput | null> {
        const findTask = await this._taskRepository.getTaskById(id);
        if (!findTask) {
            return null;
        }
        let status = StatusEnum.PENDING;
        if (findTask.status === StatusEnum.PENDING) {
            status = StatusEnum.ONGOING;
        } else {
            status = StatusEnum.STOPED;
        }

        switch (findTask.status) {
            case StatusEnum.PENDING:
                status = StatusEnum.ONGOING;
                break;
            case StatusEnum.ONGOING:
                status = StatusEnum.STOPED;
                break;
            case StatusEnum.STOPED:
                status = StatusEnum.ONGOING;
                break;
            default:
                break;
        }

        const task = await this._updateTask(findTask, status);
        if (!task) {
            return null;
        }
        return new TaskOutput(
            task.getId,
            task.task,
            StatusEnumUtils.getStatusEnum(task.status) ?? StatusEnum.PENDING,
            task.created_at,
            task.updated_at,
            TaskTypeEnumUtils.getTaskTypeEnum(task.type) ?? TaskTypeEnum.TIME,
            OperationEnumUtils.getOperationEnum(task.operation) ?? OperationEnum.CREDIT,
            task.tags,
            task.value,
            task.deleted_at,
        );
    }

    async _updateTask(task: Task, status: StatusEnum): Promise<Task | null> {

        const taskUpdated = new Task(
            task.getId,
            task.task,
            status,
            task.created_at,
            new Date(),
            task.type,
            task.operation,
            task.tags,
            task.value,
            task.deleted_at,
        );

        const output = await this._taskRepository.updateTask(taskUpdated);
        if (!task) {
            return null;
        }

        const taskHistory = {
            id: output.getId,
            task_id: output.getId,
            status: output.status,
            updated_at: output.updated_at,
        };

        await this._taskRepository.addTaskHistory(taskHistory);
        return output;
    }

    async calculateTaskCredit(id: number): Promise<number | null> {
        const task = await this._taskRepository.getTaskById(id);
        if (task?.type === TaskTypeEnum.ACTION) {
            return task.value ?? 0;
        }
        const history = await this.getTaskHistoryByTaskId(id);
        if (history === null) {
            return null;
        }
        const reverseHistory = history.reverse();
        let updateAt: Date = history[0].updated_at;
        let totalCredit = 0;
        reverseHistory?.forEach((item) => {
            if (item.status === StatusEnum.ONGOING) {
                updateAt = item.updated_at;
            }
            if (item.status === StatusEnum.STOPED) {
                const timeDiff = Math.abs(item.updated_at.getTime() - updateAt.getTime());
                const diffInMinutes = Math.floor(timeDiff / (1000 * 60));
                totalCredit += diffInMinutes;
            }
        });
        return totalCredit;
    }
    async completeTask(id: number): Promise<TaskOutput | null> {
        const task = await this._taskRepository.getTaskById(id);

        if (!task) {
            return null;
        }
        if (task.status === StatusEnum.COMPLETED) {
            return new TaskOutput(
                task.getId,
                task.task,
                StatusEnumUtils.getStatusEnum(task.status) ?? StatusEnum.PENDING,
                task.created_at,
                task.updated_at,
                TaskTypeEnumUtils.getTaskTypeEnum(task.type) ?? TaskTypeEnum.TIME,
                OperationEnumUtils.getOperationEnum(task.operation) ?? OperationEnum.CREDIT,
                task.tags,
                task.value,
                task.deleted_at,
            );;
        }

        const lastHistory = await this._taskRepository.findLastTaskHistoryByTaskId(id);
        const completedDate = new Date();
        if (lastHistory && lastHistory.status !== StatusEnum.STOPED) {
            const taskUpdated = {
                ...task,
                status: StatusEnum.STOPED,
                updated_at: completedDate,
                id: task.getId
            };
            const taskHistory = {
                id: taskUpdated.id,
                task_id: taskUpdated.id,
                status: taskUpdated.status,
                updated_at: taskUpdated.updated_at,
            };

            await this._taskRepository.addTaskHistory(taskHistory);
        }
        let value = task.value;
        if (task.type === TaskTypeEnum.TIME) {
            value = await this.calculateTaskCredit(id) ?? 0;
        }

        const taskUpdated = new Task(
            task.getId,
            task.task,
            StatusEnum.COMPLETED,
            task.created_at,
            completedDate,
            task.type,
            task.operation,
            task.tags,
            value,
            task.deleted_at,
        );

        const output = await this._taskRepository.updateTask(taskUpdated);
        if (!output) {
            return null;
        }

        const taskHistory = {
            id: output.getId,
            task_id: output.getId,
            status: output.status,
            updated_at: output.updated_at,
        };

        await this._taskRepository.addTaskHistory(taskHistory);
        return new TaskOutput(
            output.getId,
            output.task,
            StatusEnumUtils.getStatusEnum(output.status) ?? StatusEnum.PENDING,
            output.created_at,
            output.updated_at,
            TaskTypeEnumUtils.getTaskTypeEnum(output.type) ?? TaskTypeEnum.TIME,
            OperationEnumUtils.getOperationEnum(output.operation) ?? OperationEnum.CREDIT,
            output.tags,
            output.value,
            output.deleted_at,
        );
    }

    async getTotalCredit(): Promise<number> {
        return await this._taskRepository.getTotalCredit(OperationEnum.CREDIT);
    }

    async getTotalDebit(): Promise<number> {
        return await this._taskRepository.getTotalCredit(OperationEnum.DEBIT);
    }

}

export const taskService = new TaskServiceImpl();