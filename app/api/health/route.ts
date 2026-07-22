import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const secret = process.env.HEALTH_CHECK_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    const header = request.headers.get("x-health-secret");
    const token = auth?.replace(/^Bearer\s+/i, "") ?? header;
    if (token !== secret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  const checkedAt = new Date().toISOString();

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("pre_registrations")
      .select("id", { count: "exact", head: true });

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json(
          {
            ok: false,
            checkedAt,
            supabase: "table_missing",
            message: "pre_registrations 테이블이 없습니다.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          ok: false,
          checkedAt,
          supabase: "error",
          message: error.message,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      checkedAt,
      supabase: "connected",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      {
        ok: false,
        checkedAt,
        supabase: "unreachable",
        message,
      },
      { status: 503 }
    );
  }
}
