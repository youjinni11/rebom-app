import { DemoViewport } from "@/components/demo/DemoViewport";

export default function DemoMatchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoViewport>{children}</DemoViewport>;
}
