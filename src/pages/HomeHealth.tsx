import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Home, Heart, Clock, Shield, Phone, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HomeHealth = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Stethoscope, titleKey: "homeNursing", descKey: "homeNursingDesc" },
    { icon: Heart, titleKey: "postOpCare", descKey: "postOpCareDesc" },
    { icon: Clock, titleKey: "available247homeHealth", descKey: "available247homeHealthDesc" },
    { icon: Shield, titleKey: "certifiedTeam", descKey: "certifiedTeamDesc" },
    { icon: Phone, titleKey: "teleconsultation", descKey: "teleconsultationDesc" },
    { icon: Home, titleKey: "elderCare", descKey: "elderCareDesc" },
  ];

  return (
    <div className="min-h-screen bg-background pt-40">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center mb-14">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("careAtHome")}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{t("royaleHomeHealth")}</h1>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">{t("homeHealthFullDesc")}</p>
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
                whileHover={{ y: -4 }}
                className="bg-popover border border-border/50 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-base text-foreground mb-2">{t(s.titleKey)}</h3>
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

export default HomeHealth;
