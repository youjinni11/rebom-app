import type { Metadata } from "next";
import { ValuesCurationForm } from "@/components/curation/ValuesCurationForm";

export const metadata: Metadata = {
  title: "가치관 등록 | 리봄",
};

export default function ValuesCurationPage() {
  return <ValuesCurationForm />;
}
