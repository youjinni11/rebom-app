"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Profile } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { lifestyleTagsFromData, parseLifestyleData, parseValuesData } from "@/lib/curation";

type ProfileHomeScreenProps = {
  profile: Profile;
  maritalVerified: boolean;
};

const VERIFY_BUTTONS = [
  { id: "marital", label: "미혼상태 인증하기", required: true, href: "/signup/verify" },
  { id: "education", label: "학력인증하기", optional: true, href: null },
  { id: "income", label: "직업/소득 인증하기", optional: true, href: null },
] as const;

export function ProfileHomeScreen({ profile, maritalVerified }: ProfileHomeScreenProps) {
  const router = useRouter();
  const photoUrl =
    profile.photo_urls?.[0] ??
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
  const age = profile.birth_year
    ? new Date().getFullYear() - profile.birth_year
    : null;

  const valuesData = parseValuesData(profile.values_data);
  const lifestyleData = parseLifestyleData(profile.lifestyle_data);
  const lifestyleTags = lifestyleTagsFromData(lifestyleData);
  const hasValues = profile.values_complete;
  const hasLifestyle = profile.lifestyle_complete && lifestyleTags.length > 0;

  const valuesTags = [
    ...valuesData.meeting_priorities.slice(0, 2),
    ...valuesData.relationship_goals.slice(0, 1),
  ];

  return (
    <main className="px-5 py-6 pb-28 max-w-lg mx-auto">
      <header className="mb-3">
        <h1 className="text-2xl font-bold text-primary">프로필</h1>
      </header>

      <div className="flex flex-col gap-3">
        <section className="bg-white border-2 border-border rounded-2xl p-3 shadow-sm">
          <p className="text-xs font-extrabold tracking-[0.15em] text-primary mb-2">
            내 프로필 정보
          </p>
          <div className="flex items-start gap-3 mb-3">
            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden">
              <Image
                src={photoUrl}
                alt={profile.display_name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-primary leading-tight">
                {profile.display_name}
                {age && (
                  <span className="text-sm font-semibold text-foreground/70">
                    {" "}
                    · {age}세
                  </span>
                )}
              </p>
              <p className="text-xs font-semibold text-foreground/75 mt-0.5">
                📍 {profile.region}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {VERIFY_BUTTONS.map((button) => {
              const completed = button.id === "marital" && maritalVerified;
              const label =
                button.id === "marital" && completed
                  ? "인증완료"
                  : button.label;

              const isRequired = "required" in button && button.required;
              const isOptional = "optional" in button && button.optional;

              const inner = (
                <div
                  className={`min-h-9 flex items-center justify-center rounded-xl px-3 text-sm font-bold leading-tight ${
                    completed
                      ? "bg-primary-light text-primary border border-primary/25"
                      : isRequired
                        ? "bg-primary text-cream shadow-sm shadow-primary/20"
                        : "bg-primary-light text-primary border border-primary/20"
                  }`}
                >
                  {completed && <span className="mr-1.5 text-xs">✓</span>}
                  {label}
                  {isOptional && (
                    <span className="ml-1 text-xs font-semibold opacity-75">
                      (선택)
                    </span>
                  )}
                </div>
              );

              if (button.href && !completed) {
                return (
                  <Link key={button.id} href={button.href}>
                    {inner}
                  </Link>
                );
              }

              return <div key={button.id}>{inner}</div>;
            })}
          </div>
        </section>

        <section className="bg-white border-2 border-border rounded-2xl p-3 shadow-sm">
          <p className="text-xs font-extrabold tracking-[0.15em] text-primary mb-2">
            가치관
          </p>
          {hasValues ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {valuesTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-xs font-bold border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                fullWidth
                className="min-h-10 text-sm font-bold"
                onClick={() => router.push("/values")}
              >
                가치관 수정하기
              </Button>
            </div>
          ) : (
            <Button
              fullWidth
              className="min-h-12 text-sm font-bold"
              onClick={() => router.push("/values")}
            >
              가치관 입력하기
            </Button>
          )}
        </section>

        <section className="bg-white border-2 border-border rounded-2xl p-3 shadow-sm">
          <p className="text-xs font-extrabold tracking-[0.15em] text-primary mb-2">
            라이프스타일
          </p>
          {hasLifestyle ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {lifestyleTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-primary-light text-primary text-xs font-bold border border-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                fullWidth
                className="min-h-10 text-sm font-bold"
                onClick={() => router.push("/lifestyle")}
              >
                라이프스타일 수정하기
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/lifestyle")}
              className="w-full min-h-20 flex items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-primary-light/40 px-3"
            >
              <p className="text-center text-sm font-semibold text-foreground/55 leading-snug">
                큐레이션으로
                <br />
                라이프스타일을 등록해 주세요
              </p>
            </button>
          )}
        </section>

        <Button
          variant="outline"
          fullWidth
          onClick={async () => {
            const { createClient } = await import("@/lib/supabase/client");
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/");
            router.refresh();
          }}
        >
          로그아웃
        </Button>
      </div>
    </main>
  );
}
