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
        readonly created_at: string,
        readonly updated_at: string,
        readonly type: TaskTypeEnum,
        readonly operation: OperationEnum,
        readonly tags: string,
        readonly value?: number,
        readonly deleted_at?: string,
    ) { }

    get createdAt(): string {
        return new Date(this.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

}

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
        console.log(input);
        const task = {
            id: 0,
            task: input.task,
            status: StatusEnum.PENDING,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
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
}

export const taskService = new TaskServiceImpl();