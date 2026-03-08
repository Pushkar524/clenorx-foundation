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
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <AboutSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <ProgramsSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <ImpactDashboard />
      <div className="section-divider mx-6 sm:mx-16" />
      <VolunteerSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <DonationSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <PartnersSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <TeamSection />
      <div className="section-divider mx-6 sm:mx-16" />
      <ContactSection />
      <Footer />
    </main>
  );
}
