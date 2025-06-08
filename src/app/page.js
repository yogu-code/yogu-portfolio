import { AuroraBackground } from "../components/ui/aurora-background";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import ThankYou from "../components/ThankYou";
import { SkillShowcase } from "@/components/SkillShowCaseComponenet";
export default function HomePage() {
  return (
    <AuroraBackground>
      <Hero />
      <AboutMe />
      <div className="w-full overflow-x-hidden">
        <SkillShowcase />
      </div>
      <ThankYou />
    </AuroraBackground>
  );
}
