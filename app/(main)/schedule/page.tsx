"use client";

import { useEffect, useState } from "react";
import type { AppointmentWithDetails } from "@/types/database";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Tab = "proposed" | "confirmed";

export default function SchedulePage() {
  const [tab, setTab] = useState<Tab>("proposed");
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function loadAppointments() {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data.appointments ?? []);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function handleAction(id: string, action: "confirm" | "cancel") {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "처리에 실패했습니다.");
        return;
      }

      await loadAppointments();
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = appointments.filter((a) =>
    tab === "proposed" ? a.status === "proposed" : a.status === "confirmed"
  );

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main className="px-6 py-8 max-w-lg mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary">만남 일정</h1>
      </header>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("proposed")}
          className={`flex-1 min-h-12 text-lg font-semibold rounded-xl transition-colors ${
            tab === "proposed"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/70"
          }`}
        >
          제안됨
        </button>
        <button
          onClick={() => setTab("confirmed")}
          className={`flex-1 min-h-12 text-lg font-semibold rounded-xl transition-colors ${
            tab === "confirmed"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/70"
          }`}
        >
          확정됨
        </button>
      </div>

      {loading ? (
        <p className="text-xl text-center text-foreground/70">불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-foreground/70">
            {tab === "proposed" ? "대기 중인 일정이 없습니다." : "확정된 일정이 없습니다."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((appt) => (
            <Card key={appt.id}>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">
                  {appt.partner.display_name}님
                </h3>
                <p className="text-lg">📅 {formatDate(appt.scheduled_at)}</p>
                <p className="text-lg">📍 {appt.place_name}</p>
                {appt.place_address && (
                  <p className="text-base text-foreground/70">{appt.place_address}</p>
                )}
                {appt.note && (
                  <p className="text-base text-foreground/70 bg-muted p-3 rounded-xl">
                    {appt.note}
                  </p>
                )}

                {appt.status === "proposed" && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      loading={actionLoading === appt.id}
                      onClick={() => handleAction(appt.id, "cancel")}
                    >
                      거절
                    </Button>
                    <Button
                      className="flex-1"
                      loading={actionLoading === appt.id}
                      onClick={() => handleAction(appt.id, "confirm")}
                    >
                      수락
                    </Button>
                  </div>
                )}

                {appt.status === "confirmed" && appt.partner.phone && (
                  <div className="bg-success/10 border border-success rounded-xl p-4 mt-2">
                    <p className="text-lg font-semibold text-success">연락처</p>
                    <p className="text-xl font-bold mt-1">{appt.partner.phone}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
