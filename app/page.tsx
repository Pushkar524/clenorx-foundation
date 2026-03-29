import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import VolunteerSection from "@/components/VolunteerSection";
import DonationSection from "@/components/DonationSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-transparent pt-28 sm:pt-32 lg:pt-36">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <VolunteerSection />
      <DonationSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
