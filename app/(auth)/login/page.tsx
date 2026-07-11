"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { formatAuthError } from "@/lib/auth-errors";
import { Logo } from "@/components/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/matches";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(formatAuthError(authError.message));
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
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
          required
          autoComplete="current-password"
        />
        {error && <p className="text-error text-lg">{error}</p>}
        <Button type="submit" fullWidth loading={loading}>
          로그인
        </Button>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="xl" href="/" textClassName="text-primary" />
          </div>
          <p className="text-xl text-foreground/70">로그인</p>
        </div>

        <Suspense fallback={<Card><p className="text-lg text-center">불러오는 중...</p></Card>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-lg">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-primary font-semibold underline">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
