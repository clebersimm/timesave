import TaskRepository from "../repository/TaskRepository";
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
    addTask(input: TaskInput): Promise<void>;
}

export class TaskServiceImpl implements TaskServiceInterface {

    private _taskRepository: TaskRepository;

    constructor() {
        this._taskRepository = new TaskRepositoryImpl();
    }

    async getTasks(): Promise<TaskOutput[]> {
        const tasks = await this._taskRepository.getTasks();
        return tasks.map(task => new TaskOutput(
            task.id,
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

    async addTask(input: TaskInput): Promise<void> {
        const task = {
            id: 0,
            task: input.task,
            status: StatusEnum.PENDING,
            created_at: new Date(),
            updated_at: new Date(),
            type: input.type,
            operation: input.operation,
            tags: input.tags,
            value: input.value,
        };
        await this._taskRepository.addTask(task);
    }

    async getTaskById(id: number): Promise<TaskOutput | null> {
        const task = await this._taskRepository.getTaskById(id);
        if (!task) {
            return null;
        }
        return new TaskOutput(
            task.id,
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

        const taskUpdated = {
            ...findTask,
            status: status,
            updated_at: new Date(),
        };
        const task = await this._taskRepository.updateTask(taskUpdated);
        if (!task) {
            return null;
        }

        const taskHistory = {
            id: 0,
            task_id: task.id,
            status: task.status,
            updated_at: task.updated_at,
        };

        await this._taskRepository.addTaskHistory(taskHistory);

        return new TaskOutput(
            task.id,
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

    async calculateTaskCredit(id: number): Promise<number | null> {
        const history = await this.getTaskHistoryByTaskId(id);
        if (history === null) {
            return null;
        }
        const reverseHistory = history.reverse();
        console.log("history", reverseHistory);
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
}

export const taskService = new TaskServiceImpl();