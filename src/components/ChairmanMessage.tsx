import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ChairmanMessage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 bg-background" ref={ref} id="chairman">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-3">{t("aMessageFrom")}</p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8">{t("theChairman")}</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-popover rounded-2xl p-8 md:p-10 border border-border/50 relative">
            <Quote className="w-8 h-8 text-accent/20 absolute top-6 left-6" />
            <p className="font-body text-xs text-muted-foreground mb-4 italic">{lang === "ar" ? "عزيزي المريض / الزائر،" : "Dear Patient / Visitor,"}</p>
            <blockquote className="font-serif text-base md:text-lg text-foreground leading-relaxed italic mb-4 relative z-10">
              {t("chairmanQuote")}
            </blockquote>
            <div className="space-y-3 mb-6">
              {t("chairmanFullMessage").split("\n\n").map((paragraph, i) => (
                <p key={i} className="font-body text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground italic mb-4">
              {lang === "ar" ? "مستشفى رويال حياة ...وجهتك لصحة أفضل والاحتفاء بالحياة!" : "Royale Hayat Hospital ...your destination for better health and to celebrate life!"}
            </p>
            <div>
              <p className="font-serif text-sm text-primary font-medium">{t("chairmanName")}</p>
              <p className="font-body text-xs text-muted-foreground">{t("chairmanTitle")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;
