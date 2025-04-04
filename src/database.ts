import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('myDatabase.db');

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.withTransactionAsync(tx => {
      // Create a table if it doesn't exist
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          age INTEGER NOT NULL
        );`,
        [],
        () => {
          console.log('Table created successfully');
          // Check for schema updates here
          checkSchemaUpdates(tx)
            .then(resolve)
            .catch(reject);
        },
        (_, error) => {
          console.log('Error creating table:', error);
          reject(error);
        }
      );
    });
  });
};

const checkSchemaUpdates = (tx: SQLite.SQLTransaction): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Example: Add a new column 'email' if it doesn't exist
    tx.executeSql(
      `ALTER TABLE users ADD COLUMN email TEXT;`,
      [],
      () => {
        console.log('Schema updated successfully');
        resolve();
      },
      (_, error) => {
        // Ignore error if column already exists
        if (error.message.includes('duplicate column name')) {
          resolve();
        } else {
          console.log('Error updating schema:', error);
          reject(error);
        }
      }
    );
  });
};