import type { Metadata } from "next";
import { LifestyleCurationForm } from "@/components/curation/LifestyleCurationForm";

export const metadata: Metadata = {
  title: "라이프스타일 등록 | 리봄",
};

export default function LifestyleCurationPage() {
  return <LifestyleCurationForm />;
}
