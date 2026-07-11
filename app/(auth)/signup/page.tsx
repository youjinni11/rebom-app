"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { formatAuthError } from "@/lib/auth-errors";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(formatAuthError(authError.message));
      setLoading(false);
      return;
    }

    if (!data.session) {
      setError(
        "가입 요청은 접수됐지만 바로 로그인되지 않았습니다. 이메일함의 확인 링크를 누르거나, Supabase에서 「이메일 확인」을 끈 뒤 다시 가입해 주세요."
      );
      setLoading(false);
      return;
    }

    router.push("/signup/verify");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="xl" href="/" textClassName="text-primary" />
          </div>
          <p className="text-xl text-foreground/70">회원가입</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              autoComplete="email"
            />
            <Input
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              required
              autoComplete="new-password"
            />
            <Input
              label="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            {error && (
              <div className="space-y-2">
                <p className="text-error text-lg">{error}</p>
                {error.includes("이메일 확인") && (
                  <p className="text-base text-foreground/65 leading-relaxed">
                    Supabase → Authentication → Sign In / Providers → Email →
                    「Confirm email」 끄기
                  </p>
                )}
              </div>
            )}
            <Button type="submit" fullWidth loading={loading}>
              가입하기
            </Button>
          </form>
        </Card>

        <p className="text-center text-lg">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-primary font-semibold underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
