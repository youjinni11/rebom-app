import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { createServiceClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { id } = await params;
    const { action } = await request.json();

    if (!["confirm", "cancel"].includes(action)) {
      return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: appointment } = await supabase
      .from("appointments")
      .select("*, matches(*)")
      .eq("id", id)
      .maybeSingle();

    if (!appointment) {
      return NextResponse.json({ error: "일정을 찾을 수 없습니다." }, { status: 404 });
    }

    const match = appointment.matches as { user1_id: string; user2_id: string };
    const isParticipant =
      match.user1_id === user.id || match.user2_id === user.id;

    if (!isParticipant) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    if (appointment.status !== "proposed") {
      return NextResponse.json({ error: "이미 처리된 일정입니다." }, { status: 400 });
    }

    const newStatus = action === "confirm" ? "confirmed" : "cancelled";

    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: newStatus });
  } catch (error) {
    const message = error instanceof Error ? error.message : "일정 처리 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
