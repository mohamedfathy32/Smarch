import AboutSection from "./AboutSection ";
import ChaletSection from "./ChaletSection";
import HeroSection from "./HeroSection";
import OpinionSection from "./OpinionSection";
import QuickStats from "./QuickStats";
import ServiceSection from "./ServiceSection";

export default function HomePage() {
  return (
    <>


      <div className="relative">
        <HeroSection />

        <div className="absolute left-0 right-0 mx-auto -mt-24">
          <QuickStats />
        </div>

        <div className="md:mt-32 mt-16">
        </div>
      </div>

      <ChaletSection />
      <ServiceSection />
      <AboutSection />
      <OpinionSection />
    </>
  );
}
