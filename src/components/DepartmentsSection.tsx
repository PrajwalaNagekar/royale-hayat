import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, X, Stethoscope } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { doctors as allDoctors } from "@/data/doctors";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

interface Department {
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
  img: string;
  subs?: { name: string; nameAr: string }[];
}

const departments: Department[] = [
  {
    name: "Obstetrics & Gynecology", nameAr: "التوليد وأمراض النساء",
    desc: "Complete maternity care from prenatal through postpartum recovery, supported by over 600 healthcare professionals.",
    descAr: "رعاية أمومة شاملة من ما قبل الولادة حتى التعافي بعدها، بدعم من أكثر من 600 متخصص.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop&crop=faces",
    subs: [
      { name: "Women's Health", nameAr: "صحة المرأة" },
      { name: "Urogynecology", nameAr: "أمراض المسالك البولية النسائية" },
      { name: "Cosmetic Gynecology", nameAr: "أمراض النساء التجميلية" },
      { name: "Gynecologic Oncology", nameAr: "أورام النساء" },
      { name: "Physiotherapy", nameAr: "العلاج الطبيعي" },
      { name: "Parent and Childbirth Education", nameAr: "تثقيف الوالدين والولادة" },
    ],
  },
  {
    name: "Family Medicine", nameAr: "طب الأسرة",
    desc: "Continuous, personalized care for individuals and families of all ages with coordinated health management.",
    descAr: "رعاية مستمرة ومخصصة للأفراد والعائلات من جميع الأعمار مع إدارة صحية منسقة.",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=250&fit=crop",
    subs: [
      { name: "Chronic Disease Management", nameAr: "إدارة الأمراض المزمنة" },
      { name: "Preventive Health Screening", nameAr: "فحوصات الصحة الوقائية" },
      { name: "Health Education", nameAr: "التثقيف الصحي" },
    ],
  },
  {
    name: "Al Safwa Healthcare Program", nameAr: "برنامج الصفوة للرعاية الصحية",
    desc: "Personalized executive health program with premium screening, dedicated coordinators, and elegant private suites.",
    descAr: "برنامج صحي تنفيذي مخصص مع فحوصات متميزة ومنسقين مخصصين وأجنحة خاصة أنيقة.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
    subs: [
      { name: "Executive Health Screening", nameAr: "الفحص الصحي التنفيذي" },
      { name: "VIP Wellness Programs", nameAr: "برامج عافية كبار الشخصيات" },
      { name: "Personalized Health Coordination", nameAr: "التنسيق الصحي المخصص" },
    ],
  },
  {
    name: "Dental Clinic", nameAr: "عيادة الأسنان",
    desc: "Exceptional dental care in a luxurious setting with specialized dentists using advanced technology for all ages.",
    descAr: "رعاية أسنان استثنائية في بيئة فاخرة مع أطباء متخصصين يستخدمون تقنيات متقدمة لجميع الأعمار.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop",
    subs: [
      { name: "Cosmetic Dentistry", nameAr: "تجميل الأسنان" },
      { name: "Dental Implants", nameAr: "زراعة الأسنان" },
      { name: "Orthodontics", nameAr: "تقويم الأسنان" },
      { name: "Pediatric Dentistry", nameAr: "طب أسنان الأطفال" },
    ],
  },
  {
    name: "Reproductive Medicine & IVF", nameAr: "الطب التناسلي وأطفال الأنابيب",
    desc: "Advanced fertility treatments blending expertise with cutting-edge technology, including IVF, ICSI, and genetic diagnosis.",
    descAr: "علاجات خصوبة متقدمة تجمع بين الخبرة والتكنولوجيا المتطورة، بما في ذلك أطفال الأنابيب والحقن المجهري.",
    img: "https://www.zeiss.com/content/dam/rms/reference-master/applications/reproductive-medicine/axio-observer_ivf_narishige-micromanipulation_5.jpg/_jcr_content/renditions/original.image_file.1707.1280.107,0,1814,1280.file/axio-observer_ivf_narishige-micromanipulation_5.jpg",
    subs: [
      { name: "IVF Treatment", nameAr: "أطفال الأنابيب" },
      { name: "ICSI", nameAr: "الحقن المجهري" },
      { name: "Fertility Preservation", nameAr: "حفظ الخصوبة" },
      { name: "Reproductive Endocrinology", nameAr: "الغدد الصماء التناسلية" },
    ],
  },
  {
    name: "Pain Management", nameAr: "إدارة الألم",
    desc: "Comprehensive program offering advanced, compassionate care for acute and chronic pain to restore comfort and functionality.",
    descAr: "برنامج شامل يقدم رعاية متقدمة ورحيمة للألم الحاد والمزمن لاستعادة الراحة والوظائف.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    subs: [
      { name: "Interventional Pain Procedures", nameAr: "إجراءات الألم التدخلية" },
      { name: "Nerve Blocks", nameAr: "تخدير الأعصاب" },
      { name: "Spinal Cord Stimulation", nameAr: "تحفيز الحبل الشوكي" },
      { name: "Cancer Pain Management", nameAr: "إدارة ألم السرطان" },
    ],
  },
  {
    name: "Pediatrics", nameAr: "طب الأطفال",
    desc: "World-class pediatric care with warmth and a child-centered approach, from infancy through adolescence.",
    descAr: "رعاية أطفال عالمية المستوى بدفء ونهج محوره الطفل، من الرضاعة حتى المراهقة.",
    img: "http://kpfamilybirthcenter.org/sites/kpfamilybirthcenter/files/2017-03/nicu-5.jpg",
    subs: [
      { name: "Pediatric Intensive Care Unit (PICU)", nameAr: "وحدة العناية المركزة للأطفال" },
      { name: "General Pediatrics", nameAr: "طب الأطفال العام" },
      { name: "Immunization Programs", nameAr: "برامج التطعيم" },
    ],
  },
  {
    name: "Anesthesia", nameAr: "التخدير",
    desc: "Top-tier anesthesia services ensuring patient safety and comfort for all surgical and childbirth procedures.",
    descAr: "خدمات تخدير عالية المستوى تضمن سلامة المريض وراحته لجميع الإجراءات الجراحية والولادة.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
    subs: [
      { name: "Obstetric Anesthesia", nameAr: "تخدير التوليد" },
      { name: "Epidural & Regional Blocks", nameAr: "التخدير فوق الجافية والموضعي" },
      { name: "Pediatric Anesthesia", nameAr: "تخدير الأطفال" },
      { name: "Cardiac Anesthesia", nameAr: "تخدير القلب" },
    ],
  },
  {
    name: "Neonatal", nameAr: "حديثي الولادة",
    desc: "Level III Neonatal Unit — the highest in Kuwait's private sector — offering specialized care for premature and critically ill infants.",
    descAr: "وحدة حديثي الولادة من المستوى الثالث — الأعلى في القطاع الخاص بالكويت.",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=250&fit=crop",
    subs: [
      { name: "Special Care Baby Unit (SCBU)", nameAr: "وحدة العناية الخاصة بالمواليد" },
      { name: "Premature Infant Care", nameAr: "رعاية الخدج" },
      { name: "Neonatal Follow-up Programs", nameAr: "برامج متابعة حديثي الولادة" },
    ],
  },
  {
    name: "Intensive Care", nameAr: "العناية المركزة",
    desc: "Round-the-clock monitoring and care for severe, life-threatening conditions with cutting-edge technology.",
    descAr: "مراقبة ورعاية على مدار الساعة للحالات الحرجة المهددة للحياة بأحدث التقنيات.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop",
    subs: [
      { name: "Ventilator Management", nameAr: "إدارة أجهزة التنفس" },
      { name: "Sepsis & Infection Control", nameAr: "السيطرة على تعفن الدم والعدوى" },
      { name: "Post-Surgical Recovery", nameAr: "التعافي بعد الجراحة" },
    ],
  },
  {
    name: "Internal Medicine", nameAr: "الطب الباطني",
    desc: "Comprehensive diagnosis and treatment of complex adult diseases with personalized health check programs.",
    descAr: "تشخيص وعلاج شامل لأمراض البالغين المعقدة مع برامج فحص صحي مخصصة.",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop",
    subs: [
      { name: "Cardiology", nameAr: "أمراض القلب" },
      { name: "Nephrology", nameAr: "أمراض الكلى" },
      { name: "Gastroenterology", nameAr: "أمراض الجهاز الهضمي" },
      { name: "Endocrinology & Metabolism", nameAr: "الغدد الصماء والتمثيل الغذائي" },
      { name: "Rheumatology", nameAr: "أمراض الروماتيزم" },
      { name: "Clinical Nutrition & Dietetics", nameAr: "التغذية السريرية" },
    ],
  },
  {
    name: "Center for Diagnostic Imaging", nameAr: "مركز التصوير التشخيصي",
    desc: "Advanced diagnostic and image-guided therapeutic services combining expert professionals with state-of-the-art technology.",
    descAr: "خدمات تشخيصية وعلاجية موجهة بالتصوير تجمع بين متخصصين وتقنيات حديثة.",
    img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=250&fit=crop",
    subs: [
      { name: "The Abdominal & Women's Imaging", nameAr: "تصوير البطن والمرأة" },
      { name: "The Breast Imaging", nameAr: "تصوير الثدي" },
      { name: "The Cardiovascular & Thoracic Imaging", nameAr: "تصوير القلب والصدر" },
      { name: "The Musculoskeletal Imaging", nameAr: "تصوير العضلات والعظام" },
      { name: "The Neuroradiology and Head & Neck Imaging", nameAr: "الأشعة العصبية" },
      { name: "The Pediatric Imaging", nameAr: "تصوير الأطفال" },
      { name: "The Vascular & Interventional Radiology", nameAr: "الأشعة الوعائية والتدخلية" },
    ],
  },
  {
    name: "General & Laparoscopic Surgery", nameAr: "الجراحة العامة والمنظار",
    desc: "Exceptional surgical care blending expert skills with advanced technology for precision, safety, and quick recovery.",
    descAr: "رعاية جراحية استثنائية تجمع بين المهارات والتكنولوجيا المتقدمة.",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop",
    subs: [
      { name: "Obesity Bariatric Surgery", nameAr: "جراحة السمنة" },
      { name: "Breast Surgical Oncology", nameAr: "أورام الثدي الجراحية" },
      { name: "Abdominal Wall Reconstruction", nameAr: "إعادة بناء جدار البطن" },
      { name: "Clinical Nutrition & Dietetics", nameAr: "التغذية السريرية" },
    ],
  },
  {
    name: "Laboratory Services", nameAr: "خدمات المختبر",
    desc: "CAP-accredited laboratory providing gold-standard diagnostic testing and pathology services.",
    descAr: "مختبر معتمد من CAP يقدم فحوصات تشخيصية وخدمات علم الأمراض بأعلى المعايير.",
    img: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=400&h=250&fit=crop",
    subs: [
      { name: "Clinical Pathology", nameAr: "علم الأمراض السريري" },
      { name: "Histopathology", nameAr: "علم الأنسجة المرضية" },
      { name: "Microbiology", nameAr: "علم الأحياء الدقيقة" },
      { name: "Hematology", nameAr: "أمراض الدم" },
    ],
  },
  {
    name: "Plastic Surgery", nameAr: "الجراحة التجميلية",
    desc: "Internationally certified physicians offering advanced surgical and non-surgical cosmetic and reconstructive solutions.",
    descAr: "أطباء معتمدون دولياً يقدمون حلولاً تجميلية وترميمية جراحية وغير جراحية متقدمة.",
    img: "https://xivents.com/wp-content/uploads/2023/05/Differences-Between-Plastic-Surgery-and-Reconstructive-Surgery.jpg",
    subs: [
      { name: "Rhinoplasty", nameAr: "تجميل الأنف" },
      { name: "Body Contouring", nameAr: "نحت الجسم" },
      { name: "Reconstructive Surgery", nameAr: "الجراحة الترميمية" },
      { name: "Non-Surgical Aesthetics", nameAr: "التجميل غير الجراحي" },
    ],
  },
  {
    name: "Royale Hayat Pharmacy", nameAr: "صيدلية رويال حياة",
    desc: "Comprehensive pharmacy services ensuring safe and effective medication management for all patients.",
    descAr: "خدمات صيدلية شاملة تضمن إدارة آمنة وفعالة للأدوية لجميع المرضى.",
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=250&fit=crop",
    subs: [
      { name: "Medication Dispensing", nameAr: "صرف الأدوية" },
      { name: "Patient Counseling", nameAr: "استشارات المرضى" },
      { name: "Drug Interaction Monitoring", nameAr: "مراقبة التفاعلات الدوائية" },
    ],
  },
  {
    name: "Dermatology", nameAr: "الأمراض الجلدية",
    desc: "Expert care for all dermatological needs combining clinical excellence with the latest advances for adults and children.",
    descAr: "رعاية متخصصة لجميع احتياجات الأمراض الجلدية مع أحدث التطورات.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop",
    subs: [
      { name: "Medical Dermatology", nameAr: "الأمراض الجلدية الطبية" },
      { name: "Cosmetic Procedures", nameAr: "الإجراءات التجميلية" },
      { name: "Skin Cancer Screening", nameAr: "فحص سرطان الجلد" },
      { name: "Laser Treatments", nameAr: "علاجات الليزر" },
    ],
  },
  {
    name: "Clinical Pharmacy", nameAr: "الصيدلة السريرية",
    desc: "Expert pharmaceutical care integrated with clinical teams for optimal medication therapy outcomes.",
    descAr: "رعاية صيدلانية متخصصة مدمجة مع الفرق السريرية لتحقيق أفضل نتائج العلاج الدوائي.",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop",
    subs: [
      { name: "Medication Therapy Optimization", nameAr: "تحسين العلاج الدوائي" },
      { name: "Pharmacovigilance", nameAr: "اليقظة الدوائية" },
      { name: "Antimicrobial Stewardship", nameAr: "إدارة مضادات الميكروبات" },
    ],
  },
  {
    name: "ENT (Ear, Nose & Throat)", nameAr: "الأنف والأذن والحنجرة",
    desc: "Expert care for conditions affecting the ear, nose, throat, head, and neck with both medical and surgical expertise.",
    descAr: "رعاية متخصصة لأمراض الأنف والأذن والحنجرة والرأس والرقبة بخبرات طبية وجراحية.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    subs: [
      { name: "Sinus Surgery", nameAr: "جراحة الجيوب الأنفية" },
      { name: "Hearing Restoration", nameAr: "استعادة السمع" },
      { name: "Pediatric ENT", nameAr: "أنف وأذن وحنجرة الأطفال" },
      { name: "Tonsillectomy", nameAr: "استئصال اللوزتين" },
    ],
  },
  {
    name: "Royale Home Health", nameAr: "رويال للرعاية المنزلية",
    desc: "Premium medical care delivered in the comfort and privacy of your home by certified professionals.",
    descAr: "رعاية طبية متميزة تُقدم في راحة وخصوصية منزلك من قبل متخصصين معتمدين.",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=250&fit=crop",
    subs: [
      { name: "Home-Based Medical Care", nameAr: "الرعاية الطبية المنزلية" },
      { name: "Post-Discharge Follow-up", nameAr: "المتابعة بعد الخروج" },
      { name: "Chronic Care at Home", nameAr: "الرعاية المزمنة في المنزل" },
      { name: "Wound Care", nameAr: "رعاية الجروح" },
    ],
  },
];

// Map department display names to doctor department values
const deptNameAliases: Record<string, string[]> = {
  "Reproductive Medicine & IVF": ["IVF & Reproductive Medicine", "Reproductive Medicine & IVF"],
  "Plastic Surgery": ["Plastic & Cosmetic Surgery", "Plastic Surgery"],
  "Anesthesia": ["Anesthesia", "Anesthesia & Intensive Care"],
};

const DepartmentsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [doctorScrollIndex, setDoctorScrollIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { lang, t } = useLanguage();

  const getDeptDoctors = (deptName: string) => {
    const aliases = deptNameAliases[deptName] || [deptName];
    return allDoctors.filter((doc) => aliases.includes(doc.department));
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setDoctorScrollIndex(0);
  };

  const selectedDept = openIndex !== null ? departments[openIndex] : null;
  const deptDoctors = selectedDept ? getDeptDoctors(selectedDept.name) : [];
  const maxDoctorScroll = Math.max(0, deptDoctors.length - 4);

  // Reorder: expanded first, rest after
  const reorderedDepts = openIndex !== null
    ? [departments[openIndex], ...departments.filter((_, i) => i !== openIndex)]
    : departments;

  const getOriginalIndex = (dept: Department) =>
    departments.findIndex((d) => d.name === dept.name);

  const numStr = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section className="py-16 md:py-24 bg-background" ref={sectionRef} id="departments">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-body mb-4">{t("ourSpecialties")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">{t("medicalDepartments")}</h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm md:text-base">
            {t("deptCount")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reorderedDepts.map((dept) => {
            const origIdx = getOriginalIndex(dept);
            const isExpanded = openIndex === origIdx;

            return (
              <motion.div
                key={dept.name}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: Math.min(origIdx * 0.04, 0.6), ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`bg-popover rounded-2xl overflow-hidden border border-border/50 cursor-pointer group transition-all duration-500 ${
                  isExpanded ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
                onClick={() => !isExpanded && handleToggle(origIdx)}
              >
                {!isExpanded ? (
                  /* Collapsed: Image card */
                  <>
                    <div className="relative h-36 md:h-40 overflow-hidden">
                      <img
                        src={dept.img}
                        alt={lang === "ar" ? dept.nameAr : dept.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-popover/70 to-transparent" />
                      <span className="absolute top-3 left-3 text-2xl font-serif text-primary-foreground/80 drop-shadow-lg">
                        {numStr(origIdx)}
                      </span>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-sm md:text-base font-serif text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {lang === "ar" ? dept.nameAr : dept.name}
                      </h3>
                      <p className="text-muted-foreground font-body text-xs leading-relaxed mb-3 line-clamp-2">
                        {lang === "ar" ? dept.descAr : dept.desc}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-body text-xs tracking-wide hover:text-accent transition-colors">
                        {t("learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </>
                ) : (
                  /* Expanded Panel */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col lg:flex-row"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Left: Image + Info */}
                    <div className="lg:w-2/5 relative">
                      <div className="relative h-48 lg:h-full min-h-[320px] overflow-hidden">
                        <img
                          src={dept.img}
                          alt={lang === "ar" ? dept.nameAr : dept.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-popover via-popover/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-4xl font-serif text-primary/60 mb-2 block">{numStr(origIdx)}</span>
                          <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">
                            {lang === "ar" ? dept.nameAr : dept.name}
                          </h3>
                          <p className="text-muted-foreground font-body text-sm leading-relaxed">
                            {lang === "ar" ? dept.descAr : dept.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Sub-specialties + Doctor Cards */}
                    <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col">
                      {/* Header with close */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          {dept.subs && dept.subs.length > 0 && (
                            <>
                              <p className="text-accent text-xs tracking-[0.2em] uppercase font-body mb-2">
                                {lang === "ar" ? "التخصصات الفرعية" : "Sub-specialties"}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {dept.subs.map((sub) => (
                                  <span
                                    key={sub.name}
                                    className="px-3 py-1.5 rounded-full text-xs font-body bg-secondary/50 text-foreground border border-border/30"
                                  >
                                    {lang === "ar" ? sub.nameAr : sub.name}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                          {(!dept.subs || dept.subs.length === 0) && (
                            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-lg">
                              {lang === "ar" ? dept.descAr : dept.desc}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => setOpenIndex(null)}
                          className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-colors flex-shrink-0 ml-4"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>

                      {/* Doctor Cards — matching DoctorsSection style */}
                      {deptDoctors.length > 0 ? (
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-accent text-xs tracking-[0.2em] uppercase font-body">
                              {lang === "ar" ? "أطباء القسم" : "Department Doctors"}
                            </p>
                            {deptDoctors.length > 4 && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setDoctorScrollIndex(Math.max(0, doctorScrollIndex - 1))}
                                  disabled={doctorScrollIndex === 0}
                                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDoctorScrollIndex(Math.min(maxDoctorScroll, doctorScrollIndex + 1))}
                                  disabled={doctorScrollIndex >= maxDoctorScroll}
                                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-30"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <motion.div
                              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                              key={doctorScrollIndex}
                              initial={{ opacity: 0.5, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {deptDoctors.slice(doctorScrollIndex, doctorScrollIndex + 4).map((doc) => (
                                <Link to={`/doctors/${doc.id}`} key={doc.id}>
                                  <motion.div
                                    whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(74,20,35,0.12)" }}
                                    className="bg-background rounded-2xl overflow-hidden border border-border/50 group/doc cursor-pointer"
                                  >
                                    <div className={`${doc.color} h-28 flex items-center justify-center relative overflow-hidden`}>
                                      <div className="w-14 h-14 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center border-2 border-popover/30">
                                        <span className="text-lg font-serif text-primary-foreground">{doc.initials}</span>
                                      </div>
                                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-popover/20 backdrop-blur-sm flex items-center justify-center">
                                        <Stethoscope className="w-3 h-3 text-primary-foreground" />
                                      </div>
                                    </div>
                                    <div className="p-3">
                                      <p className="text-accent text-[9px] tracking-[0.2em] uppercase font-body mb-1">
                                        {lang === "ar" ? doc.specialtyAr : doc.specialty}
                                      </p>
                                      <h4 className="text-sm font-serif text-foreground group-hover/doc:text-primary transition-colors line-clamp-1">
                                        {lang === "ar" ? doc.nameAr : doc.name}
                                      </h4>
                                      <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-1">
                                        {lang === "ar" ? doc.titleAr : doc.title}
                                      </p>
                                      <p className="text-xs text-primary font-body mt-2 inline-flex items-center gap-1">
                                        {t("viewProfile")} <ArrowRight className="w-3 h-3" />
                                      </p>
                                    </div>
                                  </motion.div>
                                </Link>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground font-body text-xs italic mt-auto">
                          {lang === "ar" ? "لم يتم تعيين أطباء لهذا القسم بعد" : "No doctors assigned to this department yet."}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
