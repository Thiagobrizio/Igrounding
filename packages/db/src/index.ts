import Connection, { type Database } from "better-sqlite3";
import {
    type BetterSQLite3Database,
    drizzle,
} from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { fileURLToPath } from "url";

import * as librarySchema from "./library";
import * as projectSchema from "./project";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type LibraryDatabase = BetterSQLite3Database<typeof librarySchema> & {
    $client: Connection.Database;
};
export type ProjectDatabase = BetterSQLite3Database<typeof projectSchema> & {
    $client: Connection.Database;
};
export type DatabaseConnection = Database;

export function initLibrary(path: string | Buffer): LibraryDatabase {
    const conn = new Connection(path);
    const db = drizzle(conn, { schema: librarySchema });
    // check for migrations and ask user if they want to run them.
    return db;
}

function getMigrationFolder() {
    return path.join(__dirname, "..", "migrations");
}

export async function createProject(
    filePath: string,
    tempPath: string
): Promise<ProjectDatabase> {
    const fileConnection = new Connection(filePath);
    const fileDb = drizzle(fileConnection, { schema: projectSchema });
    migrate(fileDb, { migrationsFolder: getMigrationFolder() });
    await fileConnection.backup(path.join(tempPath, "temp.db"));

    fileConnection.close();
    const tempConnection = new Connection(path.join(tempPath, "temp.db"));
    const tempDb = drizzle(tempConnection, { schema: projectSchema });
    return tempDb;
}

export async function openProject(
    filePath: string,
    tempPath: string
): Promise<ProjectDatabase> {
    const fileDb = new Connection(filePath, {
        readonly: true,
    });
    await fileDb.backup(path.join(tempPath, "temp.db"));

    fileDb.close();
    const tempDb = new Connection(path.join(tempPath, "temp.db"));
    const db = drizzle(tempDb, { schema: projectSchema });
    return db;
}
