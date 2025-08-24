import { tool, ParameterType } from "@optimizely-opal/opal-tools-sdk";
import sqlite3 from "sqlite3";
import path from "path";

interface SqliteQueryParameters {
  query: string;
  database?: string;
}

async function sqliteQuery(parameters: SqliteQueryParameters) {
  const { query, database = "data/Chinook.db" } = parameters;

  const dbPath = path.resolve(database);

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        reject(new Error(`Failed to open database: ${err.message}`));
        return;
      }
    });

    const queryType = query.trim().toUpperCase();
    
    if (queryType.startsWith("SELECT") || queryType.startsWith("WITH")) {
      db.all(query, [], (err, rows) => {
        if (err) {
          db.close();
          reject(new Error(`Query failed: ${err.message}`));
          return;
        }

        db.close((closeErr) => {
          if (closeErr) {
            console.warn(`Warning: Failed to close database: ${closeErr.message}`);
          }
        });

        resolve({
          success: true,
          rowCount: rows.length,
          data: rows,
          query: query,
          database: database,
        });
      });
    } else {
      db.close();
      reject(new Error("Only SELECT and WITH queries are allowed for security reasons"));
    }
  });
}

tool({
  name: "sqlite_query",
  description: "Execute read-only SQL queries against SQLite databases. Only SELECT and WITH queries are supported.",
  parameters: [
    {
      name: "query",
      type: ParameterType.String,
      description: "SQL query to execute (SELECT or WITH queries only)",
      required: true,
    },
    {
      name: "database",
      type: ParameterType.String,
      description: "Path to SQLite database file (defaults to data/Chinook.db)",
      required: false,
    },
  ],
})(sqliteQuery);