import { AuroraBackground } from "./components/ui/aurora-background";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import ThankYou from "./components/ThankYou";
export default function HomePage() {
  return (
    <AuroraBackground>
      <Hero />
      <AboutMe />
      <ThankYou />
    </AuroraBackground>
  );
}
