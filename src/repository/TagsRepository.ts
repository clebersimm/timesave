export default interface TagsRepository {
    getTags(): Promise<Tag[]>;
}

export class Tag {
    constructor(
        readonly id: number,
        readonly name: string,
    ) {}
}