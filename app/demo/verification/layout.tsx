import { DemoViewport } from "@/components/demo/DemoViewport";

export default function DemoPlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoViewport>{children}</DemoViewport>;
}
