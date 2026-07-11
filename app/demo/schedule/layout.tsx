import { DemoViewport } from "@/components/demo/DemoViewport";

export default function DemoScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoViewport>{children}</DemoViewport>;
}
