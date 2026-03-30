import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { doctors } from "@/data/doctors";

const DoctorsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const { lang, t } = useLanguage();

  const featuredDoctors = doctors.slice(0, 12);
  const visibleCount = 4;
  const maxStart = Math.max(0, featuredDoctors.length - visibleCount);

  const next = () => setStartIndex((p) => Math.min(p + 1, maxStart));
  const prev = () => setStartIndex((p) => Math.max(p - 1, 0));

  const visibleDoctors = featuredDoctors.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="py-20 bg-background" id="our-doctors">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-14">
          <ScrollAnimationWrapper>
            <div>
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">{t("ourTeam")}</p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">{t("meetOurDoctors")}</h2>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.1}>
            <div className="flex items-center gap-3">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prev}
                disabled={startIndex === 0}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={next}
                disabled={startIndex >= maxStart}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <Link to="/doctors" className="hidden md:inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3 rounded-full font-body text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 ml-2">
                {t("viewAllDoctors")}
              </Link>
            </div>
          </ScrollAnimationWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleDoctors.map((doc, offset) => (
            <Link to={`/doctors/${doc.id}`} key={doc.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: offset * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(74,20,35,0.12)" }}
                className="bg-popover rounded-2xl overflow-hidden border border-border/50 group cursor-pointer"
              >
                <div className={`${doc.color} h-44 flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-20 h-20 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30">
                    <span className="text-2xl font-serif text-primary-foreground">{doc.initials}</span>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
                    <Stethoscope className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-accent text-[10px] tracking-[0.2em] uppercase font-body mb-1.5">{lang === "ar" ? doc.specialtyAr : doc.specialty}</p>
                  <h3 className="text-base font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{lang === "ar" ? doc.nameAr : doc.name}</h3>
                  <p className="text-muted-foreground font-body text-xs mb-3">{lang === "ar" ? doc.titleAr : doc.title}</p>
                  <p className="text-muted-foreground font-body text-xs leading-relaxed mb-3 line-clamp-2">{lang === "ar" ? doc.bioAr : doc.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(lang === "ar" ? doc.languagesAr : doc.languages).map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded-full bg-secondary/40 text-[10px] font-body text-foreground">{l}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-body text-xs tracking-wide hover:text-accent transition-colors">
                    {t("viewProfile")}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5 mt-8">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button key={i} onClick={() => setStartIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === startIndex ? "bg-accent w-6" : "bg-border w-2 hover:bg-muted-foreground"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
