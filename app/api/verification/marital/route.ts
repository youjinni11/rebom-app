import { NextResponse } from "next/server";
import { verifyMaritalStatus } from "@/lib/codef";
import { getCurrentUser } from "@/lib/auth-helpers";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const body = await request.json();
    const { name, birthDate, gender } = body;

    if (!name || !birthDate) {
      return NextResponse.json(
        { error: "실명과 생년월일을 입력해 주세요." },
        { status: 400 }
      );
    }

    const result = await verifyMaritalStatus({ name, birthDate, gender });
    const supabase = createServiceClient();

    const { error: dbError } = await supabase.from("verifications").upsert(
      {
        user_id: user.id,
        type: "marital",
        status: result.approved ? "approved" : "rejected",
        codef_raw: result.raw,
        verified_at: result.approved ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,type" }
    );

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      approved: result.approved,
      message: result.message,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "인증 처리 중 오류";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
