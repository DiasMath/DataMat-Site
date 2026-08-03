import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import HowWeWorkSection from "@/components/home/HowWeWorkSection";
import ResultsSection from "@/components/home/ResultsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

const Index = () => {
  useScrollToHash();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SocialProofSection />
        <SolutionsSection />
        <HowWeWorkSection />
        <ResultsSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
