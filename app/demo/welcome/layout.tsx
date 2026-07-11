import { DemoViewport } from "@/components/demo/DemoViewport";

export default function DemoWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoViewport>{children}</DemoViewport>;
}
