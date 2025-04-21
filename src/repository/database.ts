import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync('timesave.db');
  return db;
};

export const initDatabase = async () => {
  const currentDbVersion = '1';
  try {
    const dbVersion = await checkDatabase();
    if(currentDbVersion === dbVersion) {
      console.log('Database is already initialized');
      return;
    }
    await _initDB();
    updateCurrentDbVersion('1');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

const updateCurrentDbVersion = async (dbVersion: string) => {
  const db = await getDBConnection();
  const query = `INSERT OR REPLACE INTO settings (key, value) VALUES ('db_version', ?)`;
  const params = [dbVersion];
  await db.runAsync(query, params);
};

export const checkDatabase = async () => {
  try {
    const db = await getDBConnection();
    const version = await db.getFirstAsync<{ value: string }>('SELECT value FROM settings WHERE key = "db_version"');
    return version?.value || null;
  } catch (error) {
    console.error('Error checking database:', error);
  }
  return null;
}

const _initDB = async () => {
  const db = await getDBConnection();
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