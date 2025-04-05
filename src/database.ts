import * as SQLite from 'expo-sqlite';

const _getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync('timesave.db');
  return db;
};

const _initDB = async () => {
  const db = await _getDBConnection();
  const query = `
    CREATE TABLE IF NOT EXISTS task (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      status INTEGER NOT NULL,
      status_description TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT,
      type INTEGER NOT NULL,
      operation INTEGER NOT NULL,
      value INTEGER,
      tag TEXT
    );
    CREATE TABLE IF NOT EXISTS task_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      status INTEGER NOT NULL,
      status_description TEXT,
      created_at TEXT NOT NULL,
      value INTEGER,
      FOREIGN KEY (task_id) REFERENCES task (id)
    );
    CREATE TABLE IF NOT EXISTS total(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      value INTEGER NOT NULL,
      operation INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
  `;
  await db.execAsync(query);
};