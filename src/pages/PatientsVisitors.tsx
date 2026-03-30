import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Clock, Bed, FileText, Shield, HelpCircle, Phone, ClipboardList, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const sections = [
  { icon: Clock, titleKey: "visitingHours", descKey: "visitingHoursDesc" },
  { icon: Bed, titleKey: "roomServices", descKey: "roomServicesDesc" },
  { icon: FileText, titleKey: "patientGuide", descKey: "patientGuideDesc" },
  { icon: ClipboardList, titleKey: "admissionChecklist", descKey: "admissionChecklistDesc" },
  { icon: Shield, titleKey: "insuranceHelp", descKey: "insuranceHelpDesc" },
  { icon: Stethoscope, titleKey: "recordsRequest", descKey: "recordsRequestDesc" },
  { icon: HelpCircle, titleKey: "faqs", descKey: "faqsDesc" },
  { icon: Phone, titleKey: "supportDesk", descKey: "supportDeskDesc" },
];

const PatientsVisitors = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-40">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center mb-14">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("forOurPatients")}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{t("patientsVisitors")}</h1>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">{t("patientsVisitorsDesc")}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {sections.map((s, i) => (
              <motion.div
                key={s.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-popover border border-border/50 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-foreground mb-1">{t(s.titleKey)}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PatientsVisitors;
