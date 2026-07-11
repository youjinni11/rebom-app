import { DemoViewport } from "@/components/demo/DemoViewport";

export default function DemoLifestyleCurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoViewport>{children}</DemoViewport>;
}
