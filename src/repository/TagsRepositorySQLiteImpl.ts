import { getDBConnection, initDatabase } from "./database";
import TagsRepository, { Tag } from "./TagsRepository";

export class TagsRepositorySQLiteImpl implements TagsRepository {

    constructor() {
        initDatabase();
    }

    async getDBConnection() {
        const db = await getDBConnection();
        return db;
    }

    async getTags(): Promise<Tag[]> {
        const db = await this.getDBConnection();
        try {
            const query = `SELECT id, tag 
            FROM tags order by tag asc`;
            const tags = await db.getAllAsync<{ id: number, tag: string }>(query);
            return tags.map(tag => new Tag(tag.id, tag.tag));
        } catch (error) {
            console.error("Error getting tags:", error);
        } finally {
            await db.closeAsync();
        }
        return [];
    }
}