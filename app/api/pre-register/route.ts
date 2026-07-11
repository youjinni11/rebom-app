import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const PHONE_PATTERN = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, gender, ageRange, phone, consentRequired, consentMarketing } = body;

    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ error: "이름을 2자 이상 입력해 주세요." }, { status: 400 });
    }

    if (!["male", "female"].includes(gender)) {
      return NextResponse.json({ error: "성별을 선택해 주세요." }, { status: 400 });
    }

    if (!["50-54", "55-59", "60-64", "65-69"].includes(ageRange)) {
      return NextResponse.json({ error: "연령대를 선택해 주세요." }, { status: 400 });
    }

    const normalizedPhone = String(phone ?? "").replace(/\s/g, "");
    if (!PHONE_PATTERN.test(normalizedPhone)) {
      return NextResponse.json(
        { error: "올바른 휴대폰 번호를 입력해 주세요. (예: 010-1234-5678)" },
        { status: 400 }
      );
    }

    if (!consentRequired) {
      return NextResponse.json(
        { error: "개인정보 수집·이용 동의는 필수입니다." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("pre_registrations").insert({
      name: name.trim(),
      gender,
      age_range: ageRange,
      phone: normalizedPhone,
      consent_required: true,
      consent_marketing: Boolean(consentMarketing),
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "이미 사전예약이 접수된 번호입니다." },
          { status: 409 }
        );
      }
      if (error.code === "42P01") {
        return NextResponse.json(
          {
            error:
              "사전예약 기능이 아직 준비 중입니다. Supabase에서 003_pre_registrations.sql을 실행해 주세요.",
          },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "요청 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
