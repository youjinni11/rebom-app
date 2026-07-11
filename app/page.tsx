import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { WhySection } from "@/components/landing/WhySection";
import { ProblemsSection } from "@/components/landing/ProblemsSection";
import { PromisesSection } from "@/components/landing/PromisesSection";
import { VerificationSection } from "@/components/landing/VerificationSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="landing-prose">
        <Hero />
        <WhySection />
        <ProblemsSection />
        <PromisesSection />
        <VerificationSection />
        <TrustSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </>
  );
}
