import { NextResponse } from "next/server";
import { checkDbConnection, getDatabaseTime } from "@/lib/db";

export async function GET() {
  const dbOk = await checkDbConnection();
  const dbTime = dbOk ? await getDatabaseTime() : null;

  return NextResponse.json({
    ok: true,
    db: dbOk ? "up" : "down",
    dbTime,
    service: "gridgeek-platform"
  });
}
