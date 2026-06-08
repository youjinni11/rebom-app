import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { getDailyRecommendations } from "@/lib/recommendations";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const profiles = await getDailyRecommendations(user.id);
    return NextResponse.json({ profiles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "추천 조회 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
