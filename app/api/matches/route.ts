import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { createServiceClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const supabase = createServiceClient();

    const { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = await Promise.all(
      (matches ?? []).map(async (match) => {
        const partnerId =
          match.user1_id === user.id ? match.user2_id : match.user1_id;

        const { data: partner } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", partnerId)
          .single();

        return {
          id: match.id,
          partner: partner as Profile,
          created_at: match.created_at,
        };
      })
    );

    return NextResponse.json({ matches: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "매칭 조회 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
