import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl });
  }

  return pool;
}

export async function checkDbConnection(): Promise<boolean> {
  try {
    const client = await getDbPool().connect();
    try {
      await client.query("SELECT 1");
      return true;
    } finally {
      client.release();
    }
  } catch {
    return false;
  }
}
