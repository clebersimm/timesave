import TagsRepository from "../repository/TagsRepository";
import { TagsRepositorySQLiteImpl } from "../repository/TagsRepositorySQLiteImpl";

export class TagsOutput {
    constructor(
        readonly id: number,
        readonly tag: string,
    ){}
}

export interface TagsServiceInterface {
    getTags: () => Promise<TagsOutput[]>;
}


export class TagsService implements TagsServiceInterface {
    private _tagsRepository: TagsRepository;
    
        constructor() {
            this._tagsRepository = new TagsRepositorySQLiteImpl();
        }

    async getTags(): Promise<TagsOutput[]> {
        const tags = await this._tagsRepository.getTags();
        return tags.map(tag => new TagsOutput(tag.id, tag.name));
    }
}

export const tagsService = new TagsService();