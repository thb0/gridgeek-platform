import { Pool } from "pg";

function resolveDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  const runningInDocker = process.env.RUNNING_IN_DOCKER === "true";
  if (runningInDocker) {
    return databaseUrl;
  }

  const fallbackHost = process.env.DATABASE_HOST_FALLBACK ?? "127.0.0.1";

  try {
    const resolvedUrl = new URL(databaseUrl);
    if (resolvedUrl.hostname === "db") {
      resolvedUrl.hostname = fallbackHost;
    }
    return resolvedUrl.toString();
  } catch {
    return databaseUrl;
  }
}

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = new Pool({ connectionString: resolveDatabaseUrl() });
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

export async function getDatabaseTime(): Promise<string | null> {
  try {
    const result = await getDbPool().query<{ now: string }>("SELECT NOW()::text AS now");
    return result.rows[0]?.now ?? null;
  } catch {
    return null;
  }
}
