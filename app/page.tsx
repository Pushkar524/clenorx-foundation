import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import ImpactDashboard from "@/components/ImpactDashboard";
import VolunteerSection from "@/components/VolunteerSection";
import DonationSection from "@/components/DonationSection";
import PartnersSection from "@/components/PartnersSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-transparent">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ImpactDashboard />
      <VolunteerSection />
      <DonationSection />
      <PartnersSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
