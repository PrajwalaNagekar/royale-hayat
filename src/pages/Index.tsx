import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import StoryBlock from "@/components/StoryBlock";
import IntelligentBooking from "@/components/IntelligentBooking";
import SpecializedCare from "@/components/SpecializedCare";

import DoctorsSection from "@/components/DoctorsSection";
import WhyRoyaleHayat from "@/components/WhyRoyaleHayat";
import ChairmanMessage from "@/components/ChairmanMessage";

import AwardsSection from "@/components/AwardsSection";
import InsurancePartners from "@/components/InsurancePartners";
import TestimonialsSection from "@/components/TestimonialsSection";
import HospitalityBanner from "@/components/HospitalityBanner";
import HomeHealthSpotlight from "@/components/HomeHealthSpotlight";
import PatientsQuickLinks from "@/components/PatientsQuickLinks";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsRow />
      <StoryBlock />
      <IntelligentBooking />
      <SpecializedCare />
      <InsurancePartners />
      <DoctorsSection />
      <WhyRoyaleHayat />
      <HospitalityBanner />
      <HomeHealthSpotlight />
      <ChairmanMessage />
      <AwardsSection />
      <PatientsQuickLinks />
      <TestimonialsSection />
      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
