import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { createServiceClient } from "@/lib/supabase/server";
import type { AppointmentWithDetails, Profile } from "@/types/database";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const supabase = createServiceClient();

    const { data: userMatches } = await supabase
      .from("matches")
      .select("id")
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .eq("status", "active");

    const matchIds = userMatches?.map((m) => m.id) ?? [];

    if (matchIds.length === 0) {
      return NextResponse.json({ appointments: [] });
    }

    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("*, matches(*)")
      .in("match_id", matchIds)
      .in("status", ["proposed", "confirmed"])
      .order("scheduled_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result: AppointmentWithDetails[] = await Promise.all(
      (appointments ?? []).map(async (appt) => {
        const match = appt.matches as { user1_id: string; user2_id: string; id: string; status: string; created_at: string };
        const partnerId =
          match.user1_id === user.id ? match.user2_id : match.user1_id;

        const { data: partner } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", partnerId)
          .single();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { matches, ...appointment } = appt;

        return {
          ...appointment,
          partner: partner as Profile,
          match: {
            id: match.id,
            user1_id: match.user1_id,
            user2_id: match.user2_id,
            status: match.status as "active",
            created_at: match.created_at,
          },
        };
      })
    );

    return NextResponse.json({ appointments: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "일정 조회 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { matchId, scheduledAt, placeName, placeAddress, note } =
      await request.json();

    if (!matchId || !scheduledAt || !placeName) {
      return NextResponse.json({ error: "필수 항목을 입력해 주세요." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: match } = await supabase
      .from("matches")
      .select("*")
      .eq("id", matchId)
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .maybeSingle();

    if (!match) {
      return NextResponse.json({ error: "매칭을 찾을 수 없습니다." }, { status: 404 });
    }

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        match_id: matchId,
        proposer_id: user.id,
        scheduled_at: scheduledAt,
        place_name: placeName,
        place_address: placeAddress || null,
        note: note || null,
        status: "proposed",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "일정 제안 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
