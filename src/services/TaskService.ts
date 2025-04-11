import TaskRepository from "../repository/TaskRepository";
import { TaskRepositoryImpl } from "../repository/TaskRepositoryImpl";
import OperationEnum from "../shared/OperationEnum";
import StatusEnum, { StatusEnumUtils } from "../shared/StatusEnum";
import TaskTypeEnum, { TaskTypeEnumUtils } from "../shared/TaskTypeEnum";

export class TaskOutput {
    constructor(
        readonly id: number,
        readonly task: string,
        readonly status: number,
        readonly status_description: string,
        readonly created_at: string,
        readonly updated_at: string,
        readonly deleted_at: string,
        readonly type: string,
        readonly operation: number,
        readonly value: number,
        readonly tag: string
    ) { }

    public getTypeTask(): TaskTypeEnum {
        return TaskTypeEnumUtils.getTaskTypeEnum(this.type) ?? TaskTypeEnum.TIME;
    }

    public getStatusTask(): StatusEnum {
        return StatusEnumUtils.getStatusEnum(this.status) ?? StatusEnum.PENDING;
    }
}

export class TaskInput {
    constructor(
        readonly task: string,
        readonly type: TaskTypeEnum,
        readonly operation: OperationEnum,
        readonly value: number,
        readonly tag: string
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
            task.status,
            task.status_description,
            task.created_at,
            task.updated_at,
            task.deleted_at,
            task.type,
            task.operation,
            task.value,
            task.tag
        ));
    }

    async addTask(input: TaskInput): Promise<void> {
        console.log(input);
        const task = {
            task: input.task,
            type: input.type,
            operation: input.operation,
            value: input.value,
            tag: input.tag
        };
        //await this._taskRepository.addTask(task);
    }
}

export const taskService = new TaskServiceImpl();