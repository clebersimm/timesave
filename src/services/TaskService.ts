import TaskRepository from "../repository/TaskRepository";
import { TaskRepositoryImpl } from "../repository/TaskRepositoryImpl";
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

export default class TaskService {

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
}