import { NextResponse } from "next/server";
import { checkDbConnection } from "@/lib/db";

export async function GET() {
  const dbOk = await checkDbConnection();

  return NextResponse.json({
    ok: true,
    db: dbOk ? "up" : "down",
    service: "gridgeek-platform"
  });
}
