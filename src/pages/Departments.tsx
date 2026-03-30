import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import DepartmentsSection from "@/components/DepartmentsSection";

const Departments = () => {
  return (
    <div className="min-h-screen bg-background pt-[76px]">
      <Header />
      <DepartmentsSection />
      <Footer />
      <ChatButton />
      <ScrollToTop />
    </div>
  );
};

export default Departments;
