import { useState, useRef, useEffect } from "react";
import { Menu, X, Globe, Search, ChevronDown, Building2, Stethoscope, Users, Home, Heart, UtensilsCrossed, Star, ShieldCheck, Phone, MapPin, Clock, FileText, Bed, Sparkles, Download, BookOpen, Coffee, Droplets, Baby, Syringe, ClipboardList, UserCheck, Camera, ScrollText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logoSmall from "@/assets/rhh-logo.png";
import logoFull from "@/assets/rhh-logo-full-color.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutSubLinks = [
    { label: t("ourStory"), href: "#about", icon: BookOpen, desc: lang === "ar" ? "قصة مستشفى رويال حياة" : "The story of Royale Hayat Hospital" },
    { label: lang === "ar" ? "الرسالة والقيم" : "Mission & Values", href: "#about", icon: Heart, desc: lang === "ar" ? "رسالتنا وقيمنا الأساسية" : "Our mission and core values" },
    { label: t("chairmanMessage"), href: "#chairman", icon: Users, desc: lang === "ar" ? "رسالة رئيس مجلس الإدارة" : "A message from the Chairman" },
    { label: lang === "ar" ? "فريق القيادة" : "Leadership Team", href: "#about", icon: UserCheck, desc: lang === "ar" ? "تعرف على فريق القيادة" : "Meet our visionary leaders" },
  ];

  const medicalSubLinks = [
    { label: t("departments"), href: "/departments", icon: Building2, desc: t("deptCount") },
    { label: t("doctors"), href: "/doctors", icon: Stethoscope, desc: t("meetOurDoctors") },
  ];

  const homeHealthSubLinks = [
    { label: lang === "ar" ? "خدمات التمريض" : "Nursing Services", href: "/home-health", icon: Heart, desc: lang === "ar" ? "رعاية تمريضية متخصصة في المنزل" : "Specialized nursing care at home" },
    { label: lang === "ar" ? "العلاج الطبيعي" : "Physiotherapy", href: "/home-health", icon: Users, desc: lang === "ar" ? "إعادة التأهيل والعلاج الطبيعي" : "Rehabilitation & physical therapy" },
    { label: lang === "ar" ? "الرعاية بعد الجراحة" : "Post-Surgery Care", href: "/home-health", icon: ShieldCheck, desc: lang === "ar" ? "رعاية متابعة بعد العمليات" : "Follow-up care after procedures" },
  ];

  const hospitalitySubLinks = [
    { label: lang === "ar" ? "القاعات الفاخرة" : "Luxury Halls", href: "/hospitality", icon: Star, desc: lang === "ar" ? "قاعات أنيقة للمناسبات" : "Elegant event spaces for celebrations" },
    { label: lang === "ar" ? "الأجنحة الفاخرة" : "Luxury Suites", href: "/hospitality", icon: Bed, desc: lang === "ar" ? "أجنحة فاخرة بمعايير فندقية" : "Luxury hotel-standard suites" },
    { label: lang === "ar" ? "خدمات الفعاليات في الغرف" : "In-Room Event Services", href: "/hospitality", icon: Sparkles, desc: lang === "ar" ? "ترتيبات فعاليات مخصصة" : "Personalized event arrangements" },
    { label: lang === "ar" ? "سبا إليمنتس" : "Elements Spa", href: "/hospitality", icon: Droplets, desc: lang === "ar" ? "خدمات استرخاء وعافية" : "Relaxation and wellness services" },
    { label: lang === "ar" ? "مقهى الليوان" : "Al Liwan Cafe", href: "/hospitality", icon: Coffee, desc: lang === "ar" ? "مأكولات راقية ومرطبات" : "Fine dining and refreshments" },
  ];

  const patientsSubLinks = [
    { label: lang === "ar" ? "التمريض" : "Nursing", href: "/patients-visitors", icon: Heart, desc: lang === "ar" ? "رعاية تمريضية متفانية" : "Dedicated nursing care" },
    { label: lang === "ar" ? "معلومات القبول" : "Admission Information", href: "/patients-visitors", icon: ClipboardList, desc: lang === "ar" ? "ما يجب معرفته قبل القبول" : "What to know before admission" },
    { label: lang === "ar" ? "التأمين الصحي" : "Health Insurance", href: "/patients-visitors", icon: ShieldCheck, desc: lang === "ar" ? "المطالبات والموافقات المسبقة" : "Claims and pre-approvals" },
    { label: lang === "ar" ? "أثناء إقامتك" : "During Your Stay", href: "/patients-visitors", icon: Bed, desc: lang === "ar" ? "خدمات الغرف والراحة" : "Room services and comfort" },
    { label: lang === "ar" ? "وثيقة حقوق المريض" : "Patient Bill of Rights", href: "/patients-visitors", icon: ScrollText, desc: lang === "ar" ? "حقوقك ومسؤولياتك" : "Your rights and responsibilities" },
    { label: lang === "ar" ? "المرضى الدوليون" : "International Patient", href: "/patients-visitors", icon: MapPin, desc: lang === "ar" ? "دعم مخصص للمرضى الدوليين" : "Dedicated international patient support" },
    { label: lang === "ar" ? "تصوير المواليد" : "Newborn Photography", href: "/patients-visitors", icon: Camera, desc: lang === "ar" ? "التقط اللحظات الأولى الثمينة" : "Capture precious first moments" },
    { label: lang === "ar" ? "نموذج السجل الطبي" : "Medical Records Form", href: "/patients-visitors", icon: FileText, desc: lang === "ar" ? "اطلب نسخة من سجلاتك" : "Request a copy of your records" },
  ];

  const contactSubLinks = [
    { label: lang === "ar" ? "اتصل بنا" : "Call Us", href: "#contact", icon: Phone, desc: "+965 1828282" },
    { label: lang === "ar" ? "موقعنا" : "Our Location", href: "#contact", icon: MapPin, desc: lang === "ar" ? "جنوب السرة، الكويت" : "South Surra, Kuwait" },
    { label: lang === "ar" ? "حجز موعد" : "Book Appointment", href: "/book-appointment", icon: Stethoscope, desc: lang === "ar" ? "احجز موعدك الآن" : "Schedule your visit now" },
  ];

  const navItems = [
    { label: t("aboutUsNav"), href: "#about", hasDropdown: "about" },
    { label: t("medicalServices"), href: "#departments", hasDropdown: "medical" },
    { label: t("royaleHomeHealth"), href: "/home-health", hasDropdown: "homehealth" },
    { label: t("hospitalityServices"), href: "/hospitality", hasDropdown: "hospitality" },
    { label: t("patientsVisitors"), href: "/patients-visitors", hasDropdown: "patients" },
    { label: t("contact"), href: "#contact", hasDropdown: "contact" },
  ];

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const searchSuggestions = [
    { label: "Cardiology", type: "Department" },
    { label: "Dr. Ahmed Al-Sabah", type: "Doctor" },
    { label: "Headache", type: "Symptom" },
    { label: "Bupa Arabia", type: "Insurance" },
    { label: "Home Health", type: "Service" },
  ].filter(s => searchQuery && s.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const linkClass =
    "text-foreground font-body text-[13px] tracking-wide hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left inline-flex items-center whitespace-nowrap";

  const getSubLinks = (key: string) => {
    switch (key) {
      case "about": return aboutSubLinks;
      case "medical": return medicalSubLinks;
      case "homehealth": return homeHealthSubLinks;
      case "hospitality": return hospitalitySubLinks;
      case "patients": return patientsSubLinks;
      case "contact": return contactSubLinks;
      default: return [];
    }
  };

  return (
    <>
      {/* Entire header: fixed, two-tier */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-white border-b border-border"
      }`}>

        {/* ── Tier 1: Logo ── */}
        <div className={`flex justify-center items-center overflow-hidden transition-all duration-500 ${
          isScrolled ? "h-10 py-1" : "h-20 md:h-24 py-3"
        }`}>
          <Link to="/" className="flex items-center justify-center">
            <motion.img
              src={logoFull}
              alt="Royale Hayat Hospital"
              className="w-auto object-contain"
              initial={false}
              animate={{
                height: isScrolled ? 28 : (window.innerWidth < 768 ? 48 : 72),
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </Link>
        </div>

        {/* ── Tier 2: Navbar ── */}
        <div className={`border-t border-border/40 transition-all duration-300 ${
          isScrolled ? "py-1.5" : "py-2"
        }`}>
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-6">

            {/* Mobile hamburger (left) */}
            <div className="xl:hidden flex items-center">
              <button
                className="w-10 h-10 flex items-center justify-center text-foreground"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 flex-1 justify-center">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.hasDropdown)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href.startsWith("/") ? (
                    <Link to={item.href} className={linkClass}>
                      <span className="inline-flex items-center gap-0.5 w-fit">
                        <span>{item.label}</span>
                        {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                      </span>
                    </Link>
                  ) : (
                    <a href={item.href} className={linkClass}>
                      <span className="inline-flex items-center gap-0.5 w-fit">
                        <span>{item.label}</span>
                        {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                      </span>
                    </a>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden z-50 p-6"
                      >
                        <p className="text-xs tracking-[0.2em] uppercase font-body text-accent mb-4">{item.label}</p>
                        <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto">
                          {getSubLinks(item.hasDropdown).map((sub) => (
                            sub.href.startsWith("/") ? (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-background transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <sub.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.label}</p>
                                  <p className="font-body text-xs text-muted-foreground mt-0.5">{sub.desc}</p>
                                </div>
                              </Link>
                            ) : (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-background transition-colors group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <sub.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.label}</p>
                                  <p className="font-body text-xs text-muted-foreground mt-0.5">{sub.desc}</p>
                                </div>
                              </a>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Utility Buttons */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-foreground" />
              </button>
              <Link
                to="/book-appointment"
                className="hidden sm:inline-flex bg-primary text-primary-foreground px-3.5 py-1.5 rounded-full text-[11px] font-body tracking-wide hover:bg-primary/90 transition-colors duration-300"
              >
                {t("bookAppointment")}
              </Link>

              <button
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-body tracking-wide border border-border text-foreground hover:bg-background transition-colors duration-300"
              >
                {t("login")}
              </button>

              {/* EN / AR Toggle */}
              <div className="flex items-center rounded-full border border-border overflow-hidden">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 text-[10px] font-body font-semibold tracking-wide transition-all duration-300 ${lang === "en"
                    ? "bg-accent text-accent-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ar")}
                  className={`px-2 py-1 text-[10px] font-body font-semibold tracking-wide transition-all duration-300 ${lang === "ar"
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                >
                  AR
                </button>
              </div>

              {/* Mobile hamburger (right side for larger mobile) */}
              <button
                className="xl:hidden hidden sm:flex w-10 h-10 items-center justify-center text-foreground"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="xl:hidden overflow-hidden"
              >
                <nav className="flex flex-col container mx-auto px-4 py-4 border-t border-border">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.href.startsWith("/") ? (
                        <Link
                          to={item.href}
                          className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors block"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="text-foreground font-body text-sm tracking-wide py-3 border-b border-border/50 hover:text-accent transition-colors block"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      {/* Search Popup */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 bg-popover border-b border-border shadow-lg z-50"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-12 pr-10 py-3 rounded-xl bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              {searchSuggestions.length > 0 && (
                <div className="max-w-2xl mx-auto mt-2 bg-popover border border-border rounded-xl overflow-hidden shadow-lg">
                  {searchSuggestions.map((s) => (
                    <button key={s.label} className="w-full px-4 py-3 flex items-center justify-between hover:bg-background transition-colors text-left">
                      <span className="font-body text-sm text-foreground">{s.label}</span>
                      <span className="text-xs font-body text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">{s.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>

  );
};

export default Header;