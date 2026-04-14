import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaDir = path.resolve(__dirname, "../db/schema");
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

async function applySchema() {
  const files = (await fs.readdir(schemaDir))
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.log("No schema files found.");
    return;
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  try {
    for (const file of files) {
      const fullPath = path.join(schemaDir, file);
      const sql = await fs.readFile(fullPath, "utf8");
      console.log(`Applying ${file}...`);
      await client.query(sql);
    }

    console.log("Schema applied.");
  } finally {
    client.release();
    await pool.end();
  }
}

applySchema().catch((error) => {
  console.error("Failed to apply schema.");
  console.error(error);
  process.exit(1);
});
