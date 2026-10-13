import type { Locale } from "./config";

const en = {
  meta: {
    description: "GuiderPlan",
  },
  nav: {
    label: "Main",
    home: "GuiderPlan home",
    products: "Products",
    howItWorks: "How it works",
    faqs: "FAQs",
    about: "About me",
    getTheGuide: "Get the guide",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    title: "Your guide to London",
    subtitle: "An easier, more enjoyable trip with our travel itinerary.",
    imageAlt: "The GuiderPlan London guide open on a phone",
  },
  products: {
    title: "Choose your destination",
    subtitle: "Every guide is a ready-made itinerary you can follow from your phone.",
    // {amount} is replaced with the number from the products list.
    price: "SAR {amount}",
    buy: "Buy the guide",
    moreInfo: "Read more",
    items: {
      london: {
        name: "London",
        country: "United Kingdom",
        description: "Royal parks, world-class museums, and markets worth crossing the city for.",
        imageAlt: "London",
      },
      barcelona: {
        name: "Barcelona",
        country: "Spain",
        description: "Gaudí's skyline, Gothic lanes, and evenings that end by the sea.",
        imageAlt: "Barcelona",
      },
      amsterdam: {
        name: "Amsterdam",
        country: "Netherlands",
        description: "Canal-side walks, gabled houses, and museums around every corner.",
        imageAlt: "Amsterdam",
      },
      northItaly: {
        name: "Northern Italy",
        country: "Italy",
        description: "Alpine lakes, the Dolomites, and old towns made for slow afternoons.",
        imageAlt: "Northern Italy",
      },
      prague: {
        name: "Prague",
        country: "Czech Republic",
        description: "Castle views, cobbled squares, and bridges over the Vltava.",
        imageAlt: "Prague",
      },
      bali: {
        name: "Bali",
        country: "Indonesia",
        description: "Rice terraces, temples, waterfalls, and beaches at sunset.",
        imageAlt: "Bali",
      },
    },
  },
  checkout: {
    // {name} is replaced with the guide's name.
    title: "Buy the {name} guide",
    intro: "Enter your details, then pay securely with StreamPay.",
    name: "Full name",
    countryCode: "Country code",
    searchCountry: "Search country…",
    noCountry: "No country found",
    phone: "Phone number",
    submit: "Continue to payment",
    submitting: "Taking you to payment…",
    close: "Close",
    privacy: "We only use your details to deliver your order.",
    errors: {
      name: "Enter your name using letters only.",
      phone: "Enter a valid phone number.",
      rateLimited: "Too many attempts. Please wait a few minutes and try again.",
      generic: "Something went wrong. Please try again.",
    },
  },
  download: {
    pendingTitle: "Confirming your payment…",
    pendingBody: "This usually takes a few seconds. Keep this page open.",
    pendingHelp: "Paid but still waiting? Message us on WhatsApp and we will sort it out.",
    readyTitle: "Your guide is ready",
    // {name} is replaced with the guide's name.
    readyBody: "Thank you! Your {name} guide is ready to download.",
    orderNumber: "Order number",
    timeLeft: "Link expires in",
    downloadsLeft: "Downloads left",
    button: "Download the PDF",
    preparing: "Preparing your download…",
    downloadError: "We couldn't start the download. Please try again.",
    expiredTitle: "This link has expired",
    expiredBody:
      "Download links work for 20 minutes. Message us on WhatsApp with your order number and we will send your guide again.",
    usedUpTitle: "Download limit reached",
    usedUpBody:
      "This link has been used the maximum number of times. Message us on WhatsApp with your order number and we will send your guide again.",
    invalidTitle: "This link isn't valid",
    invalidBody:
      "We couldn't find an order for this link. If you paid, message us on WhatsApp and we will help.",
    failedTitle: "Your payment didn't go through",
    failedBody: "You can go back and try again.",
    whatsapp: "Contact us on WhatsApp",
    backToGuides: "Back to the guides",
    // {orderNumber} is replaced with the buyer's order number.
    whatsappOrderMessage: "Hello, I need help with my GuiderPlan order {orderNumber}.",
    whatsappMessage: "Hello, I need help downloading my GuiderPlan guide.",
  },
  details: {
    close: "Close",
    insideTitle: "What's inside the guide",
    features: [
      {
        title: "A ready day-by-day itinerary",
        text: "Every day of the trip is planned for you, so you spend your time enjoying the city, not searching.",
      },
      {
        title: "One area per day",
        text: "The city is split by area, not just by landmark, so you walk through one area calmly with no wasted trips.",
      },
      {
        title: "A map location for every place",
        text: "Each stop has its Google Maps link. Tap it and go.",
      },
      {
        title: "Everything you need for each day",
        text: "A short overview, the highlights, the walking route, the best time to visit, how long it takes and how to get there.",
      },
      {
        title: "Cafés, restaurants and shopping on your route",
        text: "Picked along the way, so you don't have to cross the city for a meal.",
      },
      {
        title: "Practical tips and the apps you need",
        text: "The apps for transport, maps and bookings, plus tips that save you time and money.",
      },
      {
        title: "A PDF you follow from your phone",
        text: "Download it once and open it any time during your trip.",
      },
    ],
    planTitle: "Day by day",
    extrasTitle: "Also in this guide",
    // Only guides listed here show a day-by-day outline.
    plans: {
      london: {
        meta: "20 pages · 7 days",
        days: [
          "Hyde Park and Oxford Street: an easy first day of walking, shopping and food in central London.",
          "Two of London's main areas on one walking route, including Covent Garden.",
          "Notting Hill and Paddington.",
          "Chelsea and Knightsbridge, two of London's most elegant areas.",
          "Historic London: a walk along the river, a boat ride, and a viewpoint or a mall to finish.",
          "A shopping day in the best places to shop, with restaurants worth the stop.",
          "A day trip to Edinburgh by train, with a walk around its main sights.",
        ],
        extras: [
          "London's parks and which day each one fits: Hyde Park, Regent's Park, Holland Park and Richmond Park.",
          "Half-day ideas: Canary Wharf and Battersea Power Station.",
          "What not to miss in each season, from Winter Wonderland to Kew Gardens in spring.",
          "The essential apps: Citymapper, Google Maps, Bolt, Trainline and more.",
        ],
      },
    },
  },
  reviews: {
    title: "What customers say",
    subtitle:
      "Real replies our customers sent us on WhatsApp. Tap any picture to enlarge it. Phone numbers are hidden.",
    // Short English renderings of the Arabic messages, in picture order.
    items: [
      "Honestly one of the most beautiful travel guides I have seen. You can tell how much effort and creativity went into it.",
      "I downloaded the itinerary and it really helped me plan which sights to visit and in what order. It saves a lot of effort and time.",
      "Thank you for how well organised the itinerary is, with locations for every place. I don't need anyone on my trip but your guide.",
      "After trying the guide: honestly wonderful. Excellent, I got a lot out of it.",
      "A great guide, honestly. Thank you.",
      "Nice, fairly priced, and a lot of work went into it. Honestly I bought it for the Google Maps routes.",
      "Thanks for the itinerary organised by area. It helped me plan my own schedule.",
      "Thank you so much, the guide is wonderful and very well organised. It saved us a lot of time and effort in planning. I highly recommend it to anyone visiting London.",
      "Really wonderful, God reward you. I wish you would make one like this for Paris.",
      "Honestly organised and clear. If there were one like it for Lapland, I would buy it.",
      "Honestly and without flattery: excellent, precise work with attention to every detail.",
      "A professionally organised guide that saved me long hours of research and planning. I rate it 10/10 and recommend it to anyone travelling to Britain.",
      "Thank you so much, you got me out of a real bind. I am following it day by day.",
    ],
    labels: { previous: "Previous", next: "Next", enlarge: "Enlarge", close: "Close" },
    // The counter above the pictures. The number sits between `before` and `after`.
    trust: {
      count: 1000,
      before: "",
      after: "+",
      label: "happy customers trust GuiderPlan",
      // Read out in place of the moving number.
      full: "More than 1,000 happy customers trust GuiderPlan",
    },
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Three quick steps and the guide is on your phone.",
    swipe: "Swipe",
    // {number} is replaced with the step's position.
    step: "Step {number}",
    steps: {
      form: {
        title: "Fill in the form",
        description: "Enter your name and phone number.",
        imageAlt: "The order form",
      },
      pay: {
        title: "Pay with StreamPay",
        description: "Complete your payment through StreamPay.",
        imageAlt: "The StreamPay payment page",
      },
      receive: {
        title: "Get your guide",
        description: "You are taken straight to the download page for your PDF guide.",
        imageAlt: "The guide download page",
      },
    },
  },
  about: {
    title: "About me",
    // Three sentences; each sits on its own line on desktop.
    lines: [
      "I plan every trip I take day by day.",
      "GuiderPlan turns those plans into ready-made guides.",
      "So you spend your time enjoying the city, not searching.",
    ],
    name: "Ghaith Salama",
    role: "Founder of GuiderPlan",
    guides: "Guides so far",
    imageAlt: "Ghaith in front of the Colosseum in Rome",
  },
  footer: {
    blurb:
      "Ready-made travel itineraries that take the planning off your hands, so you can enjoy the trip.",
    explore: "Explore",
    guides: "Guides",
    followUs: "Follow us",
    tiktok: "TikTok",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    ministryOfCommerce: "Ministry of Commerce",
    commercialRegistration: "Commercial registration no.",
    // {year} is replaced with the current year.
    copyright: "Copyright © {year} GuiderPlan",
  },
  social: {
    tiktok: "GuiderPlan on TikTok",
    instagram: "GuiderPlan on Instagram",
    whatsapp: "Chat with GuiderPlan on WhatsApp",
  },
  // Shown in the other language's own name so it reads to the people who need it.
  switchLanguage: { label: "العربية", lang: "ar" },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    description: "GuiderPlan",
  },
  nav: {
    label: "الرئيسية",
    home: "الصفحة الرئيسية لـ GuiderPlan",
    products: "المنتجات",
    howItWorks: "كيف يعمل",
    faqs: "الأسئلة الشائعة",
    about: "من أنا",
    getTheGuide: "احصل على الدليل",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
  },
  hero: {
    title: "دليلك للندن",
    subtitle: "رحلتك أسهل وأمتع مع جدولنا السياحي.",
    imageAlt: "دليل لندن من GuiderPlan معروض على هاتف",
  },
  products: {
    title: "اختر وجهتك",
    subtitle: "كل دليل جدول سياحي جاهز تتابعه من جوالك.",
    price: "{amount} ر.س",
    buy: "اشترِ الدليل",
    moreInfo: "اقرأ المزيد",
    items: {
      london: {
        name: "لندن",
        country: "المملكة المتحدة",
        description: "حدائق ملكية، متاحف عالمية، وأسواق تستاهل المشوار.",
        imageAlt: "لندن",
      },
      barcelona: {
        name: "برشلونة",
        country: "إسبانيا",
        description: "عمارة غاودي، أزقة الحي القوطي، وأمسيات تنتهي على البحر.",
        imageAlt: "برشلونة",
      },
      amsterdam: {
        name: "أمستردام",
        country: "هولندا",
        description: "جولات على القنوات، بيوت تاريخية، ومتاحف في كل زاوية.",
        imageAlt: "أمستردام",
      },
      northItaly: {
        name: "شمال إيطاليا",
        country: "إيطاليا",
        description: "بحيرات جبال الألب، الدولوميت، وبلدات قديمة على مهلك.",
        imageAlt: "شمال إيطاليا",
      },
      prague: {
        name: "براغ",
        country: "التشيك",
        description: "إطلالات القلعة، ساحات مرصوفة، وجسور على نهر فلتافا.",
        imageAlt: "براغ",
      },
      bali: {
        name: "بالي",
        country: "إندونيسيا",
        description: "مدرجات الأرز، معابد وشلالات، وشواطئ وقت الغروب.",
        imageAlt: "بالي",
      },
    },
  },
  checkout: {
    title: "اشترِ دليل {name}",
    intro: "اكتب بياناتك ثم ادفع بأمان عبر StreamPay.",
    name: "الاسم الكامل",
    countryCode: "مفتاح الدولة",
    searchCountry: "ابحث عن دولة…",
    noCountry: "لا توجد دولة بهذا الاسم",
    phone: "رقم الجوال",
    submit: "المتابعة للدفع",
    submitting: "ننقلك لصفحة الدفع…",
    close: "إغلاق",
    privacy: "نستخدم بياناتك فقط لتسليم طلبك.",
    errors: {
      name: "اكتب اسمك بالحروف فقط.",
      phone: "اكتب رقم جوال صحيح.",
      rateLimited: "محاولات كثيرة. انتظر بضع دقائق ثم حاول مرة أخرى.",
      generic: "حدث خطأ. حاول مرة أخرى.",
    },
  },
  download: {
    pendingTitle: "نتأكد من عملية الدفع…",
    pendingBody: "تأخذ العملية ثوانٍ قليلة عادةً. أبقِ هذه الصفحة مفتوحة.",
    pendingHelp: "دفعت وما زلت تنتظر؟ راسلنا على واتساب ونحلّها لك.",
    readyTitle: "دليلك جاهز",
    readyBody: "شكرًا لك! دليل {name} جاهز للتحميل.",
    orderNumber: "رقم الطلب",
    timeLeft: "ينتهي الرابط بعد",
    downloadsLeft: "مرات التحميل المتبقية",
    button: "حمّل ملف PDF",
    preparing: "نجهّز التحميل…",
    downloadError: "تعذّر بدء التحميل. حاول مرة أخرى.",
    expiredTitle: "انتهت صلاحية الرابط",
    expiredBody:
      "رابط التحميل يعمل لمدة 20 دقيقة. راسلنا على واتساب برقم طلبك ونرسل لك الدليل مرة أخرى.",
    usedUpTitle: "وصلت للحد الأقصى من التحميل",
    usedUpBody:
      "استُخدم هذا الرابط أقصى عدد من المرات. راسلنا على واتساب برقم طلبك ونرسل لك الدليل مرة أخرى.",
    invalidTitle: "الرابط غير صالح",
    invalidBody: "لم نجد طلبًا لهذا الرابط. إذا دفعت، راسلنا على واتساب ونساعدك.",
    failedTitle: "لم تكتمل عملية الدفع",
    failedBody: "تقدر ترجع وتحاول مرة أخرى.",
    whatsapp: "تواصل معنا على واتساب",
    backToGuides: "العودة للأدلة",
    whatsappOrderMessage: "مرحبًا، أحتاج مساعدة في طلبي من GuiderPlan رقم {orderNumber}.",
    whatsappMessage: "مرحبًا، أحتاج مساعدة في تحميل دليلي من GuiderPlan.",
  },
  details: {
    close: "إغلاق",
    insideTitle: "وش داخل الدليل؟",
    features: [
      {
        title: "جدول جاهز يومًا بيوم",
        text: "كل يوم من رحلتك مرتب لك، عشان تقضي وقتك مستمتعًا بالمدينة مو بالبحث.",
      },
      {
        title: "كل يوم في منطقة واحدة",
        text: "المدينة مقسمة حسب المناطق مو المعالم فقط، فتمشي في منطقة وحدة بهدوء بدون لفة وضياع وقت.",
      },
      {
        title: "موقع كل مكان على الخريطة",
        text: "لكل مكان رابطه على Google Maps. اضغط وامشِ.",
      },
      {
        title: "كل اللي تحتاجه لكل يوم",
        text: "نبذة عن اليوم، أبرز المعالم، خط السير، أفضل وقت للزيارة، المدة المقترحة والمواصلات.",
      },
      {
        title: "كافيهات ومطاعم وتسوق على طريقك",
        text: "مختارة على خط سيرك، بدون ما تقطع المدينة عشان وجبة.",
      },
      {
        title: "نصائح عملية وأهم التطبيقات",
        text: "تطبيقات المواصلات والخرائط والحجوزات، مع نصائح توفر وقتك وفلوسك.",
      },
      {
        title: "ملف PDF تتابعه من جوالك",
        text: "حمّله مرة وحدة وافتحه أي وقت في رحلتك.",
      },
    ],
    planTitle: "يومًا بيوم",
    extrasTitle: "وفي الدليل أيضًا",
    plans: {
      london: {
        meta: "20 صفحة · 7 أيام",
        days: [
          "هايد بارك وشارع أكسفورد: يوم أول خفيف يجمع التمشية والتسوق والأكل في وسط لندن.",
          "أهم منطقتين في لندن على خط مشي واحد مرتب، ومنها كوفنت جاردن.",
          "نوتنق هيل وبادينغتون.",
          "تشيلسي ونايتسبريدج، منطقتان راقيتان في لندن.",
          "قلب لندن التاريخي: تمشية على النهر، رحلة بالقارب، ونختم بإطلالة أو مول.",
          "يوم تسوق في أفضل أماكن التسوق، مع مطاعم تستاهل الوقفة.",
          "رحلة يوم واحد إلى إدنبرة بالقطار، مع التمشية وأهم المعالم.",
        ],
        extras: [
          "حدائق لندن وأي يوم يناسب كل وحدة: هايد بارك، ريجنتس بارك، هولاند بارك وريتشموند بارك.",
          "أماكن تستاهل نص يوم: كناري وارف ومحطة باترسي.",
          "أماكن لا تفوتها حسب الموسم، من Winter Wonderland إلى حدائق كيو في الربيع.",
          "أهم التطبيقات: Citymapper و Google Maps و Bolt و Trainline وغيرها.",
        ],
      },
    },
  },
  reviews: {
    title: "آراء العملاء",
    subtitle:
      "ردود حقيقية وصلتنا من عملائنا على واتساب. اضغط على أي صورة لتكبيرها. أرقام الهواتف مخفية.",
    items: [
      "بصراحة من أجمل الأدلة السياحية اللي شفتها، واضح جدًا حجم الجهد والإبداع المبذول فيه.",
      "حملت الجدول واطلعت عليه، استفدت منه خصوصًا في ترتيب زيارة الأماكن السياحية ومساراتها. يوفر جهدًا ووقتًا كثيرًا.",
      "أشكركم على ترتيب الجدول وكمية الأماكن والمعلومات مع وجود لوكيشن الأماكن. ماني في حاجة أحد في سفرتي غير دليلكم.",
      "بعد تجربة الدليل، صراحة روعة. ممتاز، استفدت منه كثير.",
      "خوش دليل، يعطيك العافية الصراحة.",
      "جميل وسعره مناسب ومتعوب عليه. للأمانة أنا اشتريته عشان المسارات اللي بقوقل ماب.",
      "شكرًا على الجدول المرتب حسب كل منطقة، ساعدني على ترتيب جدولي.",
      "ألف شكر لأن الدليل رائع ومرتب جدًا، وفّر علينا وقت ومجهود كبير في التخطيط. أنصح فيه جدًا لأي شخص يرغب في زيارة لندن.",
      "رائعة جدًا، الله يجزاكم ألف خير. يا ريت تعملون كذا لباريس.",
      "بصراحة مرتب وواضح. ولو كان فيه نفسه للابيلاند أو واحد بشتريه.",
      "صراحة ومن غير مجاملة شغل ممتاز ودقيق ومهتم في كل التفاصيل.",
      "دليل مرتب بشكل احترافي بطريقة وفرت علي ساعات طويلة من البحث والتخطيط. أقيّمه 10/10 وأنصح أي شخص مسافر لبريطانيا يعتمد عليه.",
      "والله أشكرك مرة، فكيت لي أزمة وماشي عليه كل يوم بيومه. الله يجزاك خير.",
    ],
    labels: { previous: "السابق", next: "التالي", enlarge: "تكبير", close: "إغلاق" },
    trust: {
      count: 1000,
      before: "+",
      after: "",
      label: "عميل سعيد يثقون في GuiderPlan",
      full: "أكثر من 1000 عميل سعيد يثقون في GuiderPlan",
    },
  },
  howItWorks: {
    title: "كيف يعمل",
    subtitle: "ثلاث خطوات سريعة ويصير الدليل على جوالك.",
    swipe: "اسحب",
    step: "الخطوة {number}",
    steps: {
      form: {
        title: "عبّئ النموذج",
        description: "اكتب اسمك ورقم جوالك.",
        imageAlt: "نموذج الطلب",
      },
      pay: {
        title: "ادفع عبر StreamPay",
        description: "أكمل عملية الدفع عبر StreamPay.",
        imageAlt: "صفحة الدفع في StreamPay",
      },
      receive: {
        title: "استلم دليلك",
        description: "ننقلك مباشرة لصفحة تحميل دليلك بصيغة PDF.",
        imageAlt: "صفحة تحميل الدليل",
      },
    },
  },
  about: {
    title: "من أنا",
    lines: [
      "أخطط لكل رحلة أسافرها يومًا بيوم.",
      "GuiderPlan يحوّل هذه الخطط إلى أدلة جاهزة.",
      "عشان تقضي وقتك مستمتعًا بالمدينة، مو بالبحث.",
    ],
    name: "غيث سلامة",
    role: "مؤسس GuiderPlan",
    guides: "الأدلة حتى الآن",
    imageAlt: "غيث أمام الكولوسيوم في روما",
  },
  footer: {
    blurb: "جداول سياحية جاهزة تشيل عنك همّ التخطيط، عشان تستمتع برحلتك.",
    explore: "استكشف",
    guides: "الأدلة",
    followUs: "تابعنا",
    tiktok: "تيك توك",
    instagram: "إنستغرام",
    whatsapp: "واتساب",
    ministryOfCommerce: "وزارة التجارة",
    commercialRegistration: "رقم السجل التجاري",
    copyright: "جميع الحقوق محفوظة © {year} GuiderPlan",
  },
  social: {
    tiktok: "GuiderPlan على تيك توك",
    instagram: "GuiderPlan على إنستغرام",
    whatsapp: "تواصل مع GuiderPlan عبر واتساب",
  },
  switchLanguage: { label: "English", lang: "en" },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
