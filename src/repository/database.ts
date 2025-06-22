import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync('timesave.db', { useNewConnection: true });
  return db;
};

export const initDatabase = async () => {
  const dbInstance = await getDBConnection();
  const currentDbVersion = '2';
  try {
    const dbVersion = await checkDatabase(dbInstance);
    if (dbVersion === null) {
      console.log('Initializing database for the first time');
      await _initDB(dbInstance);
      await _dbv2(dbInstance);
      await updateCurrentDbVersion(dbVersion, currentDbVersion, dbInstance);
      return;
    }
    console.log(`Current database version: ${dbVersion}`);
    if (currentDbVersion === dbVersion) {
      console.log('Database is already initialized');
      return;
    }
    switch (dbVersion) {
      case '1':
        console.log('Updating database to version 2');
        await _dbv2(dbInstance);
        await updateCurrentDbVersion(dbVersion,'2',dbInstance);
        console.log('updated to version 2');
        break;
      default:
        console.log('No updates available for the database');
        return;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

const updateCurrentDbVersion = async (oldVersion: string | null, dbVersion: string,db: SQLite.SQLiteDatabase) => {
  let query = `UPDATE settings SET value = ? WHERE key = 'db_version'`;
  if(oldVersion == null){
    query = `INSERT INTO settings (key, value) VALUES ('db_version', ?)`;
    dbVersion = '1';
  }
  const params = [dbVersion];
  await db.runAsync(query, params);
};

export const checkDatabase = async (db: SQLite.SQLiteDatabase) => {
  try {
    const version = await db.getFirstAsync<{ value: string }>('SELECT value FROM settings WHERE key = "db_version"');
    return version?.value || null;
  } catch (error) {
    //console.error('Error checking database:', error);
  }
  return null;
}

const _dbv2 = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT NOT NULL UNIQUE);      
     CREATE TABLE IF NOT EXISTS task_tags (
	      task_id INTEGER,
	      tag_id INTEGER,
	      FOREIGN KEY (task_id) REFERENCES task (id),
	      FOREIGN KEY (tag_id) REFERENCES tags (id),
	      PRIMARY KEY(task_id, tag_id)
      );
    WITH RECURSIVE split(id, rest, tag) AS (
      SELECT
        id,
        tags || ',', -- adiciona uma vírgula para garantir o último elemento
        ''
      FROM task
      UNION ALL
      SELECT
        id,
        SUBSTR(rest, INSTR(rest, ',') + 1),
        TRIM(SUBSTR(rest, 1, INSTR(rest, ',') - 1))
      FROM split
      WHERE rest <> ''
        AND INSTR(rest, ',') > 0)
    INSERT OR IGNORE INTO tags (tag) SELECT DISTINCT tag FROM split WHERE tag != '';

  WITH RECURSIVE split2(id, rest, tag) AS (
    SELECT
      id,
      tags || ',', -- adiciona uma vírgula para garantir o último elemento
      ''
    FROM task
    UNION ALL
    SELECT
      id,
      SUBSTR(rest, INSTR(rest, ',') + 1),
      TRIM(SUBSTR(rest, 1, INSTR(rest, ',') - 1))
    FROM split2
    WHERE rest <> ''
      AND INSTR(rest, ',') > 0)
  INSERT OR IGNORE INTO task_tags (task_id, tag_id) SELECT id,(SELECT id FROM tags WHERE tag = split2.tag) FROM split2 WHERE tag != '';
  `);

};

const _initDB = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS task (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at Timestamp DEFAULT CURRENT_TIMESTAMP,
      updated_at Timestamp DEFAULT CURRENT_TIMESTAMP,
      type TEXT NOT NULL,
      operation TEXT NOT NULL,
      tags TEXT,
      value INTEGER,
      deleted_at Timestamp DEFAULT NULL
    );
    CREATE TABLE IF NOT EXISTS task_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      updated_at Timestamp DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (task_id) REFERENCES task (id)
    );
    CREATE TABLE IF NOT EXISTS total(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value INTEGER NOT NULL,
      operation TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings(
      key TEXT NOT NULL,
      value TEXT NOT NULL
    );
  `;

  await db.execAsync(query);
};