import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Crown, Star, Gift, Heart, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const tiers = [
  { name: "Gold", color: "bg-accent/20 border-accent/40", icon: Star },
  { name: "Platinum", color: "bg-primary/10 border-primary/30", icon: Crown },
  { name: "Diamond", color: "bg-secondary/20 border-secondary/40", icon: Award },
];

const AlSafwaProgram = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-[76px]">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollAnimationWrapper>
            <div className="text-center mb-14">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("premiumLoyalty")}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{t("alSafwaProgram")}</h1>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">{t("alSafwaDesc")}</p>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(127,35,70,0.12)" }}
                className={`rounded-2xl border-2 ${tier.color} p-8 text-center`}
              >
                <div className="w-16 h-16 rounded-full bg-popover flex items-center justify-center mx-auto mb-4">
                  <tier.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">{tier.name}</h3>
                <ul className="font-body text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2"><Gift className="w-4 h-4 text-accent" />{t("priorityBooking")}</li>
                  <li className="flex items-center gap-2"><Heart className="w-4 h-4 text-accent" />{t("dedicatedCoordinator")}</li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" />{t("exclusiveDiscounts")}</li>
                </ul>
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

export default AlSafwaProgram;
