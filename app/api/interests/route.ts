import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { toUserId } = await request.json();

    if (!toUserId || toUserId === user.id) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { error: interestError } = await supabase.from("interests").insert({
      from_user_id: user.id,
      to_user_id: toUserId,
    });

    if (interestError) {
      if (interestError.code === "23505") {
        return NextResponse.json({ matched: false, message: "이미 관심을 표시했습니다." });
      }
      return NextResponse.json({ error: interestError.message }, { status: 500 });
    }

    const { data: mutual } = await supabase
      .from("interests")
      .select("id")
      .eq("from_user_id", toUserId)
      .eq("to_user_id", user.id)
      .maybeSingle();

    let matched = false;

    if (mutual) {
      const [user1, user2] = [user.id, toUserId].sort();
      const { error: matchError } = await supabase.from("matches").upsert(
        { user1_id: user1, user2_id: user2, status: "active" },
        { onConflict: "user1_id,user2_id" }
      );

      if (!matchError) matched = true;
    }

    return NextResponse.json({ matched, message: matched ? "맞관심 매칭!" : "관심 표시 완료" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "관심 등록 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
