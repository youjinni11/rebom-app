import { DemoViewport } from "@/components/demo/DemoViewport";

export default function DemoProfileCurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoViewport>{children}</DemoViewport>;
}
