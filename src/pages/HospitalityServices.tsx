import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Crown, Utensils, Sparkles, Users, Sofa, Coffee, Flower2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  { icon: Crown, titleKey: "vipSuites", descKey: "vipSuitesDesc" },
  { icon: Sparkles, titleKey: "conciergeService", descKey: "conciergeServiceDesc" },
  { icon: Utensils, titleKey: "gourmetDining", descKey: "gourmetDiningDesc" },
  { icon: Sofa, titleKey: "familyLounge", descKey: "familyLoungeDesc" },
  { icon: Flower2, titleKey: "spaWellness", descKey: "spaWellnessDesc" },
  { icon: Coffee, titleKey: "premiumAmenities", descKey: "premiumAmenitiesDesc" },
];

const HospitalityServices = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-40">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center mb-14">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("premiumExperience")}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{t("hospitalityServicesTitle")}</h1>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">{t("hospitalityDesc")}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <motion.div
                key={s.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(127,35,70,0.1)" }}
                className="bg-popover border border-border/50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{t(s.titleKey)}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
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

export default HospitalityServices;
