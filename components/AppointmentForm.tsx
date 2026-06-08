"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface AppointmentFormProps {
  matchId: string;
  partnerName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AppointmentForm({
  matchId,
  partnerName,
  onSuccess,
  onCancel,
}: AppointmentFormProps) {
  const [scheduledAt, setScheduledAt] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          scheduledAt,
          placeName,
          placeAddress,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "일정 제안에 실패했습니다.");
        return;
      }

      onSuccess();
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold">{partnerName}님과 만남 제안</h3>

      <Input
        label="만남 날짜·시간"
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
        required
      />

      <Input
        label="장소 이름"
        placeholder="예: 스타벅스 강남점"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        required
      />

      <Input
        label="장소 주소 (선택)"
        placeholder="서울시 강남구 ..."
        value={placeAddress}
        onChange={(e) => setPlaceAddress(e.target.value)}
      />

      <Textarea
        label="메모 (선택)"
        placeholder="첫 만남 인사말 등"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          취소
        </Button>
        <Button type="submit" loading={loading} className="flex-1">
          만남 제안하기
        </Button>
      </div>
    </form>
  );
}
