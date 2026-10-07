export type SupportedLanguage = 'en' | 'es' | 'ar';

export interface Translations {
  brand: {
    name: string;
    council: string;
    tagline: string;
    secondaryStatement: string;
    arabicConcept: string;
    disclaimerShort: string;
    chairmanGateLabel: string;
  };
  nav: {
    dashboard: string;
    opportunities: string;
    companies: string;
    chairmanDashboard: string;
    dealDesk: string;
    businessRooms: string;
    krestonCrm: string;
    aiMatch: string;
    aiChairmanAssistant: string;
    events: string;
    marketIntelligence: string;
    monetization: string;
    aboutAgbic: string;
    systemHealth: string;
    login: string;
    joinNow: string;
    logout: string;
    switchPersona: string;
  };
  hero: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    howItWorksCta: string;
    statsCompanies: string;
    statsPipeline: string;
    statsCorridor: string;
    statsDealsAssisted: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      desc: string;
    }[];
  };
  chairmanGate: {
    badge: string;
    title: string;
    description: string;
    noDirectContactRule: string;
    requestIntroductionCta: string;
    dealDeskReviewNote: string;
  };
  opportunities: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterSector: string;
    filterRelationship: string;
    filterCountry: string;
    requestIntroduction: string;
    requestMarketEntry: string;
    regulatoryNotice: string;
    standardBusiness: string;
    legalReview: string;
  };
  companies: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    requestIntroduction: string;
    capabilities: string;
    strategicObjectives: string;
    verifiedBadge: string;
  };
  professionalServices: {
    title: string;
    subtitle: string;
    krestonPartner: string;
    krestonDesc: string;
    requestSupport: string;
    servicesList: string;
  };
  legal: {
    disclaimerTitle: string;
    complianceNotice: string;
    independentBody: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    brand: {
      name: 'ARGENTINA–GCC CONNECT',
      council: 'Argentina–GCC Business & Investment Council (AGBIC)',
      tagline: 'Connecting Companies, Markets & Strategic Partners',
      secondaryStatement:
        'We don’t simply connect businesses. We qualify, structure and facilitate strategic relationships.',
      arabicConcept: 'فرص بلا حدود · شراكات استراتيجية موثقة',
      disclaimerShort:
        'AGBIC is an independent private-sector council. All strategic introductions are qualified and coordinated through the AGBIC Executive Deal Desk.',
      chairmanGateLabel: 'CHAIRMAN GATE™ GOVERNANCE',
    },
    nav: {
      dashboard: 'Executive Dashboard',
      opportunities: 'Business Opportunities',
      companies: 'Verified Companies',
      chairmanDashboard: 'Chairman Dashboard',
      dealDesk: 'AGBIC Deal Desk CRM',
      businessRooms: 'Business Rooms',
      krestonCrm: 'Kreston Advisory CRM',
      aiMatch: 'Strategic AI Match',
      aiChairmanAssistant: 'AI Deal Desk Assistant',
      events: 'Summits & Missions',
      marketIntelligence: 'Market Intelligence',
      monetization: 'Membership & Pricing',
      aboutAgbic: 'About AGBIC Council',
      systemHealth: 'System Health & Audit',
      login: 'Sign In',
      joinNow: 'Join Network',
      logout: 'Sign Out',
      switchPersona: 'Switch Role / Persona',
    },
    hero: {
      headline: 'Connecting Companies, Markets &',
      headlineHighlight: 'Strategic Partners',
      subheadline:
        'A private B2B strategic relationships ecosystem operated by the Argentina–GCC Business & Investment Council. We qualify, structure, and facilitate high-level partnerships under strict Chairman Gate governance.',
      primaryCta: 'Request Business Introduction',
      secondaryCta: 'Explore Business Opportunities',
      howItWorksCta: 'How It Works (9 Steps)',
      statsCompanies: '180+ Accredited Companies',
      statsPipeline: '$1.4B+ Strategic Deal Pipeline',
      statsCorridor: 'Argentina ↔ 6 GCC Nations',
      statsDealsAssisted: '100% Deal Desk Qualified',
    },
    howItWorks: {
      title: 'How It Works — The Controlled Ecosystem',
      subtitle:
        'No direct contact. No uncontrolled introductions. Every strategic partnership passes through the AGBIC Executive Deal Desk and Chairman Gate.',
      steps: [
        { step: '01', title: 'Join', desc: 'Accredited corporate membership application.' },
        { step: '02', title: 'Discover', desc: 'Explore pre-screened companies and strategic opportunities.' },
        { step: '03', title: 'Request Introduction', desc: 'Submit structured relationship request with business objectives.' },
        { step: '04', title: 'AGBIC Qualifies', desc: 'Executive Deal Desk screens commercial viability and fit.' },
        { step: '05', title: 'Chairman Gate Approves', desc: 'Chairman review ensures bilateral alignment and governance.' },
        { step: '06', title: 'Introduction', desc: 'Formal diplomatic introduction facilitated by AGBIC executive liaison.' },
        { step: '07', title: 'Business Room', desc: 'Private data room with bilateral NDA, files, and scheduled sessions.' },
        { step: '08', title: 'Execution', desc: 'Commercial negotiation and partnership agreement structuring.' },
        { step: '09', title: 'Professional Support', desc: 'Castillo & Asociados – Kreston Argentina provides local tax and legal execution.' },
      ],
    },
    chairmanGate: {
      badge: 'CHAIRMAN GATE™',
      title: 'Controlled Business-Development Ecosystem',
      description:
        'To protect executive confidentiality and ensure relationship integrity, direct contact details are never exposed. All strategic connections pass through the AGBIC Executive Deal Desk.',
      noDirectContactRule: 'NO DIRECT CONTACT · NO UNCONTROLLED INTRODUCTIONS',
      requestIntroductionCta: 'Request Introduction via Deal Desk',
      dealDeskReviewNote: 'Screened by AGBIC Executive Secretariat and Chairman.',
    },
    opportunities: {
      title: 'Strategic Business Opportunities',
      subtitle:
        'Bilateral joint ventures, distributions, market-entry initiatives, and supply chain partnerships. Screened for compliance by AGBIC.',
      searchPlaceholder: 'Search opportunities by sector, objective, or target country...',
      filterSector: 'Sector',
      filterRelationship: 'Relationship Type',
      filterCountry: 'Country',
      requestIntroduction: 'Request Introduction',
      requestMarketEntry: 'Request Market Entry Support',
      regulatoryNotice:
        'Certain transactions may be subject to applicable capital-market regulations and may require the participation of duly authorized professionals or intermediaries.',
      standardBusiness: 'Standard Business Opportunity',
      legalReview: 'Legal Review Completed',
    },
    companies: {
      title: 'Accredited Enterprise Directory',
      subtitle:
        'Leading industrial, agricultural, energy, and technology corporations across Argentina and the GCC.',
      searchPlaceholder: 'Search verified companies by capabilities, sector, or city...',
      requestIntroduction: 'Request Introduction',
      capabilities: 'Capabilities & Products',
      strategicObjectives: 'Strategic Objectives',
      verifiedBadge: 'AGBIC VERIFIED',
    },
    professionalServices: {
      title: 'Castillo & Asociados – Kreston Argentina',
      subtitle: 'Integrated Professional Advisory & Market-Entry Execution',
      krestonPartner: 'Exclusive Advisory Partner',
      krestonDesc:
        'Providing international tax structuring, statutory audit, corporate incorporation, legal coordination, M&A due diligence, and payroll services for GCC businesses entering Argentina.',
      requestSupport: 'Request Market Entry Advisory',
      servicesList: 'Corporate Services Suite',
    },
    legal: {
      disclaimerTitle: 'Regulatory & Governance Disclaimers',
      complianceNotice:
        'AGBIC Connect is NOT a public securities offering platform. It does not solicit public investments or provide regulated securities advisory.',
      independentBody:
        'AGBIC is an independent private-sector business council and does not represent any embassy or government unless formally authorized.',
    },
  },
  es: {
    brand: {
      name: 'ARGENTINA–GCC CONNECT',
      council: 'Consejo Empresarial y de Inversión Argentina–Golfo (AGBIC)',
      tagline: 'Conectando Empresas, Mercados y Socios Estratégicos',
      secondaryStatement:
        'No nos limitamos a conectar negocios. Calificamos, estructuramos y facilitamos relaciones estratégicas.',
      arabicConcept: 'فرص بلا حدود · شراكات استراتيجية موثقة',
      disclaimerShort:
        'AGBIC es un consejo privado e independiente. Todas las introducciones estratégicas se califican y coordinan a través de la Mesa Ejecutiva de Acuerdos (Deal Desk).',
      chairmanGateLabel: 'GOBERNANZA CHAIRMAN GATE™',
    },
    nav: {
      dashboard: 'Panel Ejecutivo',
      opportunities: 'Oportunidades de Negocios',
      companies: 'Empresas Verificadas',
      chairmanDashboard: 'Panel del Chairman',
      dealDesk: 'Deal Desk CRM (AGBIC)',
      businessRooms: 'Salas de Negocios',
      krestonCrm: 'CRM Asesoría Kreston',
      aiMatch: 'Emparejamiento Estratégico AI',
      aiChairmanAssistant: 'Asistente AI Deal Desk',
      events: 'Cumbres y Misiones',
      marketIntelligence: 'Inteligencia de Mercado',
      monetization: 'Membresías y Tarifas',
      aboutAgbic: 'Acerca del Consejo AGBIC',
      systemHealth: 'Salud del Sistema y Auditoría',
      login: 'Iniciar Sesión',
      joinNow: 'Unirse a la Red',
      logout: 'Cerrar Sesión',
      switchPersona: 'Cambiar Rol / Perfil',
    },
    hero: {
      headline: 'Conectando Empresas, Mercados y',
      headlineHighlight: 'Socios Estratégicos',
      subheadline:
        'Ecosistema privado de relaciones estratégicas B2B operado por el Argentina–GCC Business & Investment Council. Calificamos, estructuramos y facilitamos alianzas bajo estricta gobernanza Chairman Gate.',
      primaryCta: 'Solicitar Introducción de Negocios',
      secondaryCta: 'Explorar Oportunidades Comerciales',
      howItWorksCta: 'Cómo Funciona (9 Pasos)',
      statsCompanies: '180+ Empresas Acreditadas',
      statsPipeline: 'USD 1.400M+ en Cartera Estratégica',
      statsCorridor: 'Argentina ↔ 6 Países del Golfo',
      statsDealsAssisted: '100% Calificado por Deal Desk',
    },
    howItWorks: {
      title: 'Cómo Funciona — Ecosistema Controlado',
      subtitle:
        'Sin contacto directo no autorizado. Todas las alianzas estratégicas pasan por la Mesa Ejecutiva de Acuerdos y el Chairman Gate.',
      steps: [
        { step: '01', title: 'Unirse', desc: 'Solicitud de membresía corporativa acreditada.' },
        { step: '02', title: 'Descubrir', desc: 'Exploración de empresas precalificadas y oportunidades estratégicas.' },
        { step: '03', title: 'Solicitar Introducción', desc: 'Presentación de solicitud formal con objetivos comerciales definidos.' },
        { step: '04', title: 'AGBIC Califica', desc: 'La Mesa Ejecutiva evalúa viabilidad, solvencia y ajuste estratégico.' },
        { step: '05', title: 'Chairman Gate Aprueba', desc: 'Revisión institucional del Chairman para validar alineamiento.' },
        { step: '06', title: 'Introducción', desc: 'Presentación formal bilateral coordinada por enlace ejecutivo de AGBIC.' },
        { step: '07', title: 'Business Room', desc: 'Sala privada de negocios con NDA bilateral, documentos y agenda.' },
        { step: '08', title: 'Ejecución', desc: 'Negociación del acuerdo comercial y estructuración de la alianza.' },
        { step: '09', title: 'Soporte Profesional', desc: 'Castillo & Asociados – Kreston Argentina asiste en estructura fiscal y societaria.' },
      ],
    },
    chairmanGate: {
      badge: 'CHAIRMAN GATE™',
      title: 'Ecosistema Controlado de Desarrollo de Negocios',
      description:
        'Para proteger la confidencialidad ejecutiva y asegurar la seriedad institucional, nunca se exponen datos de contacto directos sin autorización. Toda gestión pasa por la Mesa Ejecutiva de Acuerdos.',
      noDirectContactRule: 'SIN CONTACTO DIRECTO · SIN INTRODUCCIONES DESCONTROLADAS',
      requestIntroductionCta: 'Solicitar Introducción vía Deal Desk',
      dealDeskReviewNote: 'Supervisado por la Secretaría Ejecutiva de AGBIC y el Chairman.',
    },
    opportunities: {
      title: 'Oportunidades de Negocios Estratégicas',
      subtitle:
        'Alianzas estratégicas, distribución, joint ventures y acuerdos de suministro bilateral precalificados.',
      searchPlaceholder: 'Buscar oportunidades por sector, objetivo o país...',
      filterSector: 'Sector',
      filterRelationship: 'Tipo de Alianza',
      filterCountry: 'País',
      requestIntroduction: 'Solicitar Introducción',
      requestMarketEntry: 'Solicitar Asistencia de Entrada al Mercado',
      regulatoryNotice:
        'Ciertas transacciones pueden estar sujetas a normativas de mercados de capitales aplicables y requerir la participación de profesionales o intermediarios autorizados.',
      standardBusiness: 'Oportunidad Comercial Estándar',
      legalReview: 'Revisión Legal Completada',
    },
    companies: {
      title: 'Directorio de Empresas Acreditadas',
      subtitle:
        'Corporaciones líderes industriales, agrícolas, energéticas y tecnológicas de Argentina y el Golfo Pérsico.',
      searchPlaceholder: 'Buscar empresas por capacidades, sector o ciudad...',
      requestIntroduction: 'Solicitar Introducción',
      capabilities: 'Capacidades y Productos',
      strategicObjectives: 'Objetivos Estratégicos',
      verifiedBadge: 'AGBIC VERIFICADO',
    },
    professionalServices: {
      title: 'Castillo & Asociados – Kreston Argentina',
      subtitle: 'Asesoría Integral y Ejecución de Entrada al Mercado',
      krestonPartner: 'Socio Asesor Exclusivo',
      krestonDesc:
        'Estructuración tributaria internacional, auditoría, constitución societaria, debida diligencia de M&A y liquidación de nóminas para firmas del Golfo que ingresan a la Argentina.',
      requestSupport: 'Solicitar Asesoría de Entrada al Mercado',
      servicesList: 'Servicios Profesionales Corporativos',
    },
    legal: {
      disclaimerTitle: 'Avisos Regulatorios y de Gobernanza',
      complianceNotice:
        'AGBIC Connect NO es una plataforma de oferta pública de valores. No realiza intermediación financiera ni ofrece asesoramiento sobre valores bursátiles.',
      independentBody:
        'AGBIC es un consejo empresarial privado independiente y no representa a ninguna embajada o gobierno salvo autorización expresa.',
    },
  },
  ar: {
    brand: {
      name: 'ARGENTINA–GCC CONNECT',
      council: 'مجلس الأعمال والاستثمار الأرجنتين - دول مجلس التعاون الخليجي (AGBIC)',
      tagline: 'ربط الشركات والأسواق والشركاء الاستراتيجيين',
      secondaryStatement:
        'نحن لا نكتفي بالربط بين الأعمال؛ بل نقوم بالتدقيق، الهيكلة وتسهيل العلاقات الاستراتيجية المؤسسية.',
      arabicConcept: 'فرص بلا حدود · شراكات استراتيجية موثقة',
      disclaimerShort:
        'مجلس AGBIC هو هيئة أعمال خاصة ومستقلة. جميع طلبات التعارف تمر عبر مكتب الصفقات التنفيذي وبوابة رئيس المجلس.',
      chairmanGateLabel: 'بوابة رئيس المجلس CHAIRMAN GATE™',
    },
    nav: {
      dashboard: 'اللوحة التنفيذية',
      opportunities: 'فرص الأعمال والشراكات',
      companies: 'الشركات المعتمدة',
      chairmanDashboard: 'لوحة رئيس المجلس',
      dealDesk: 'مكتب الصفقات التنفيذي (AGBIC)',
      businessRooms: 'غرف الأعمال الخاصة',
      krestonCrm: 'إدارة استشارات كريستون',
      aiMatch: 'محرك المطابقة الذكي',
      aiChairmanAssistant: 'مساعد الذكاء الاصطناعي لرئيس المجلس',
      events: 'القمم والبعثات التجارية',
      marketIntelligence: 'معلومات السوق',
      monetization: 'العضويات والرسوم',
      aboutAgbic: 'عن مجلس AGBIC',
      systemHealth: 'فحص النظام وسجلات التدقيق',
      login: 'تسجيل الدخول',
      joinNow: 'انضم إلى الشبكة',
      logout: 'تسجيل الخروج',
      switchPersona: 'تبديل الحساب التجريبي',
    },
    hero: {
      headline: 'ربط الشركات، الأسواق و',
      headlineHighlight: 'الشركاء الاستراتيجيين',
      subheadline:
        'منصة علاقات أعمال خاصة يديرها مجلس الأعمال والاستثمار الأرجنتين - الخليج. نقوم بتأهيل وهيكلة الشراكات المؤسسية تحت إشراف وحوكمة بوابة رئيس المجلس.',
      primaryCta: 'طلب تعارف تجاري رسمي',
      secondaryCta: 'استكشاف فرص الأعمال',
      howItWorksCta: 'كيف يعمل النظام (9 مراحل)',
      statsCompanies: '+180 شركة معتمدة',
      statsPipeline: '+1.4 مليار دولار حجم الصفقات المتاحة',
      statsCorridor: 'الأرجنتين ↔ 6 دول خليجية',
      statsDealsAssisted: '100% مدققة عبر مكتب الصفقات',
    },
    howItWorks: {
      title: 'كيف يعمل النظام — منظومة أعمال منضبطة',
      subtitle:
        'لا اتصال مباشر غير معتمد. لا وساطات عشوائية. تمر كل شراكة عبر مكتب الصفقات وبوابة رئيس المجلس.',
      steps: [
        { step: '01', title: 'الانضمام', desc: 'طلب عضوية مؤسسية معتمدة للشركات.' },
        { step: '02', title: 'الاكتشاف', desc: 'استكشاف الشركات المعتمدة وفرص الشراكة.' },
        { step: '03', title: 'طلب التعارف', desc: 'تقديم طلب مهيكل بأهداف تجارية واضحة.' },
        { step: '04', title: 'تدقيق AGBIC', desc: 'تقييم الجدوى والملاءمة من قبل مكتب الصفقات.' },
        { step: '05', title: 'موافقة رئيس المجلس', desc: 'الموافقة المؤسسية عبر بوابة Chairman Gate.' },
        { step: '06', title: 'التعارف الرسمي', desc: 'جلسة تعارف دبلوماسية وتجارية بتنسيق من المجلس.' },
        { step: '07', title: 'غرفة الأعمال', desc: 'بيئة مشفرة باتفاقية سرية ومستندات تدقيق.' },
        { step: '08', title: 'التنفيذ', desc: 'التفاوض وتوقيع مذكرات التفاهم والشراكة.' },
        { step: '09', title: 'الدعم المهني', desc: 'خدمات كاستيلو وشركاه - كريستون الأرجنتين الضريبية والقانونية.' },
      ],
    },
    chairmanGate: {
      badge: 'CHAIRMAN GATE™',
      title: 'منظومة تطوير الأعمال الموجهة والمحمية',
      description:
        'لحماية سرية القيادات المؤسسية وضمان جدية الأعمال، لا يتم كشف وسائل الاتصال المباشرة مطلقاً، وتمر كافة التنسيقات عبر مكتب الصفقات.',
      noDirectContactRule: 'لا اتصال مباشر · لا تواصل عشوائي',
      requestIntroductionCta: 'طلب تعارف عبر مكتب الصفقات',
      dealDeskReviewNote: 'تخضع لتدقيق الأمانة التنفيذية ورئيس المجلس.',
    },
    opportunities: {
      title: 'فرص الأعمال والشراكات الاستراتيجية',
      subtitle:
        'مشاريع مشتركة، تمثيل تجاري، توريد دولي، ودخول الأسواق مدققة مسبقاً من AGBIC.',
      searchPlaceholder: 'ابحث في الفرص بالقطاع، الهدف أو الدولة...',
      filterSector: 'القطاع',
      filterRelationship: 'نوع الشراكة',
      filterCountry: 'الدولة',
      requestIntroduction: 'طلب تعارف رسمي',
      requestMarketEntry: 'طلب دعم دخول السوق',
      regulatoryNotice:
        'قد تخضع بعض المعاملات لتشريعات أسواق المال وتتطلب تدخل جهات ومهنيين مرخصين.',
      standardBusiness: 'فرصة تجارية قياسية',
      legalReview: 'تم التدقيق القانوني',
    },
    companies: {
      title: 'دليل الشركات والمؤسسات المعتمدة',
      subtitle:
        'كبرى المؤسسات الصناعية، الزراعية، والتقنية في الأرجنتين ودول الخليج العربي.',
      searchPlaceholder: 'ابحث عن الشركات بالقدرات والقطاع...',
      requestIntroduction: 'طلب تعارف',
      capabilities: 'القدرات والمنتجات',
      strategicObjectives: 'الأهداف الاستراتيجية',
      verifiedBadge: 'معتمد من AGBIC',
    },
    professionalServices: {
      title: 'كاستيلو وشركاه – كريستون الأرجنتين',
      subtitle: 'الاستشارات المهنية ودعم دخول السوق الأرجنتيني',
      krestonPartner: 'الشريك الاستشاري الحصري',
      krestonDesc:
        'هيكلة الضرائب الدولية، التدقيق المالي، التأسيس القانوني، وفحص الملاءمة للشركات الخليجية الداخلة للسوق الأرجنتيني.',
      requestSupport: 'طلب استشارة دخول السوق',
      servicesList: 'باقة الخدمات المؤسسية',
    },
    legal: {
      disclaimerTitle: 'التنبيهات التنظيمية والامتثال',
      complianceNotice:
        'منصة AGBIC Connect ليست منصة اكتتاب أو طرح عام للأوراق المالية ولا تقدم مشورة استثمارية مصرفية.',
      independentBody:
        'مجلس AGBIC هيئة أعمال خاصة ومستقلة ولا يمثل أية سفارة أو جهة حكومية إلا بتفويض مكتوب.',
    },
  },
};
