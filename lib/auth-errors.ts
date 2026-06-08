/** Supabase Auth 오류 → 사용자용 한국어 메시지 */
export function formatAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("rate limit")) {
    return "가입 확인 이메일 발송 한도에 걸렸습니다. Supabase에서 「이메일 확인」을 끄거나, 30~60분 후 다시 시도해 주세요. (아래 안내 참고)";
  }

  if (lower.includes("already registered") || lower.includes("already been registered")) {
    return "이미 가입된 이메일입니다. 로그인을 시도해 주세요.";
  }

  if (lower.includes("invalid email")) {
    return "이메일 형식이 올바르지 않습니다.";
  }

  if (lower.includes("password")) {
    return "비밀번호 조건을 확인해 주세요. (6자 이상)";
  }

  return message;
}
