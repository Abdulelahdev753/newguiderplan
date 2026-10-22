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
    // Two lines of one headline; the second is set in brand blue, and its last words
    // (titleMark) are underlined twice in red, as if by hand.
    title: "Enjoy travel guides",
    titleAccent: "that handle",
    titleMark: "the planning",
    subtitle: "Travel guides built on the real experiences of Gulf travellers.",
    imageAlt: "The GuiderPlan London guide open on a phone",
  },
  products: {
    title: "Choose your destination",
    subtitle: "Every guide is a ready-made itinerary you can follow from your phone.",
    // {amount} is replaced with the number from the products list.
    price: "SAR {amount}",
    buy: "Buy the guide",
    moreInfo: "Read more",
    newVersion: "New version",
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
    // Guides listed here replace the general list above with their own outline.
    guides: {
      prague: {
        headline: "Discover Prague and plan your trip with ease",
        intro:
          "A guide that brings together the best places, experiences and restaurants, with a daily route so you can simply enjoy your trip.",
        sections: [
          "Where to stay",
          "Nature and parks",
          "Shopping and outlets",
          "Activities and museums",
          "Restaurants and cafés",
          "Daily itinerary",
        ],
      },
      london: {
        headline: "Everything you need for London in one place",
        intro:
          "From choosing where to stay to shopping, food and the main sights, with an itinerary that helps you plan your days.",
        sections: [
          "Where to stay in London",
          "Nature and parks",
          "Shopping and outlets",
          "Activities and museums",
          "Seasonal spots",
          "Restaurants and cafés",
          "Food markets and experiences",
          "Daily itinerary",
        ],
      },
      bali: {
        headline: "Discover Bali and enjoy every moment",
        intro:
          "A practical guide that helps you get ready for the trip and find the most beautiful places and experiences in Bali.",
        sections: [
          "Before you fly and on arrival",
          "Health and safety",
          "Getting around and apps",
          "Stays and villas",
          "Restaurants and cafés",
          "Activities and events",
          "The best time to visit",
          "Day trips",
          "Trip itinerary",
          "My own experience in Bali",
        ],
      },
      amsterdam: {
        headline: "Discover Amsterdam the easy way",
        intro:
          "A sightseeing route and daily itinerary that help you visit the top places and enjoy the best restaurants and events.",
        sections: [
          "The top sights",
          "Restaurants and cafés",
          "Activities and events",
          "Trip route and daily itinerary",
        ],
      },
      barcelona: {
        headline: "Enjoy Barcelona with ease",
        intro:
          "A short guide that brings together the main sights, restaurants and activities, with a daily itinerary to organise your trip.",
        sections: [
          "The main sights",
          "Restaurants and cafés",
          "Activities and events",
          "Trip route and daily itinerary",
        ],
      },
      northItaly: {
        headline: "Discover the beauty of Northern Italy",
        intro:
          "A route that brings together the most beautiful destinations, with a daily itinerary and standout places to eat and things to do.",
        sections: [
          "The most beautiful towns and lakes",
          "Restaurants and cafés",
          "Activities and experiences",
          "Trip route and daily itinerary",
        ],
      },
    },
  },
  reviews: {
    title: "What customers say",
    subtitle: "Here are some of our valued customers' experiences, shared on WhatsApp.",
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
      label: "More than a thousand customers trust our travel guides",
      // Read out in place of the moving number.
      full: "More than a thousand customers trust our travel guides",
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
        description:
          "Your payment is secure and fully encrypted, through StreamPay, the best Saudi payment gateway.",
        imageAlt: "The StreamPay payment page",
      },
      receive: {
        title: "Get your guide",
        description: "You are taken straight to the download page for your PDF guide.",
        imageAlt: "The guide download page",
      },
    },
  },
  partner: {
    title: "In partnership with Travel Stars",
    body: "GuiderPlan has partnered with Travel Stars (نجوم السفر) to help you book your flights and hotels. Message us on WhatsApp for an offer on your trip.",
    button: "Contact us on WhatsApp",
    whatsappMessage: "Hello, I would like an offer for my trip through Travel Stars.",
    logoAlt: "Travel Stars (نجوم السفر) logo",
  },
  faqs: {
    title: "Frequently asked questions",
    subtitle: "Everything you need to know before and after you buy.",
    items: [
      {
        question: "How do I get the guide after paying?",
        answer:
          "Once you pay, you are taken straight back to the download page. As soon as the payment is confirmed, a button appears to download your guide as a PDF.",
      },
      {
        question: "How long does the download link last?",
        answer:
          "The link works for 20 minutes after payment, and you can download the guide up to 3 times. Save the file to your phone as soon as you download it.",
      },
      {
        question: "My link expired before I downloaded the guide. What now?",
        answer: "Message us on WhatsApp with your order number and we will send your guide again.",
      },
      {
        question: "How do I use the guide on my trip?",
        answer:
          "The guide is a PDF you open on your phone. Every place has its Google Maps link, so you tap it and go.",
      },
      {
        question: "Do I need the internet to use it?",
        answer:
          "Once downloaded, the file opens without the internet. The Google Maps links need a connection to open the map.",
      },
      {
        question: "What language are the guides in?",
        answer: "The guides are written in Arabic.",
      },
      {
        question: "Is payment secure, and how can I pay?",
        answer:
          "Payment goes through StreamPay, a secure payment provider. You can pay with mada, Apple Pay, Visa or Mastercard.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "The guide is a digital file delivered straight away, so purchases cannot be refunded. If something goes wrong with your order, message us on WhatsApp and we will sort it out.",
      },
    ],
    more: "Still have a question?",
    whatsapp: "Message us on WhatsApp",
    whatsappMessage: "Hello, I have a question about GuiderPlan.",
  },
  about: {
    title: "About me",
    // Three sentences, run together as one justified paragraph.
    lines: [
      "I'm Ghaith Salama, founder of GuiderPlan:",
      "I built this site to guide Gulf travellers to tried-and-tested places, chosen from my own trips and the experiences of other Gulf travellers.",
      "My goal is to save you the time and hassle of planning, so you can enjoy your trip without paying large sums to tour guides and travel agencies.",
    ],
    name: "Ghaith Salama",
    role: "Founder of GuiderPlan",
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
    title: "استمتع بأدلة سياحية",
    titleAccent: "تشيل عنك",
    titleMark: "هم التخطيط",
    subtitle: "أدلة سياحية مصممة من واقع تجارب شخصية.",
    imageAlt: "دليل لندن من GuiderPlan معروض على هاتف",
  },
  products: {
    title: "اختر وجهتك",
    subtitle: "كل دليل جدول سياحي جاهز تتابعه من جوالك.",
    price: "{amount} ر.س",
    buy: "اشترِ الدليل",
    moreInfo: "اقرأ المزيد",
    newVersion: "إصدار جديد",
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
    guides: {
      prague: {
        headline: "اكتشف براغ وخطط رحلتك بسهولة",
        intro: "دليل يجمع لك أهم الأماكن والتجارب والمطاعم وخط السير اليومي لتستمتع برحلتك.",
        sections: [
          "السكن والفنادق",
          "الطبيعة والحدائق",
          "التسوق والأوتلت",
          "الأنشطة والمتاحف",
          "المطاعم والمقاهي",
          "جدول الرحلة اليومي",
        ],
      },
      london: {
        headline: "كل ما تحتاجه لرحلتك إلى لندن في مكان واحد",
        intro: "من اختيار السكن إلى التسوق والمطاعم وأهم المعالم، مع جدول يساعدك ترتب أيامك.",
        sections: [
          "السكن في لندن",
          "الطبيعة والحدائق",
          "التسوق والأوتلت",
          "الأنشطة والمتاحف",
          "الأماكن الموسمية",
          "المطاعم والكافيهات",
          "أسواق الأكل والتجارب",
          "جدول الرحلة اليومي",
        ],
      },
      bali: {
        headline: "اكتشف بالي واستمتع بكل لحظة",
        intro: "دليل عملي يساعدك تستعد للسفر وتكتشف أجمل الأماكن والتجارب في بالي.",
        sections: [
          "قبل السفر والوصول",
          "الصحة والسلامة",
          "التنقل والتطبيقات",
          "السكن والفلل",
          "المطاعم والكافيهات",
          "الأنشطة والفعاليات",
          "أفضل وقت للزيارة",
          "الرحلات اليومية",
          "جدول الرحلة",
          "تجربتي الشخصية في بالي",
        ],
      },
      amsterdam: {
        headline: "اكتشف أمستردام بطريقة أسهل",
        intro: "مسار سياحي وجدول يومي يساعدك تزور أبرز الأماكن وتستمتع بأفضل المطاعم والفعاليات.",
        sections: [
          "أهم الأماكن السياحية",
          "المطاعم والمقاهي",
          "الأنشطة والفعاليات",
          "مسار الرحلة والجدول اليومي",
        ],
      },
      barcelona: {
        headline: "عيش تجربة برشلونة بكل سهولة",
        intro: "دليل مختصر يجمع لك أبرز المعالم والمطاعم والأنشطة مع جدول يومي لتنظيم رحلتك.",
        sections: [
          "أهم المعالم السياحية",
          "المطاعم والمقاهي",
          "الأنشطة والفعاليات",
          "مسار الرحلة والجدول اليومي",
        ],
      },
      northItaly: {
        headline: "اكتشف جمال الشمال الإيطالي",
        intro: "خط سير يجمع لك أجمل الوجهات مع جدول يومي وأماكن مميزة للأكل والأنشطة خلال رحلتك.",
        sections: [
          "أجمل المدن والبحيرات",
          "المطاعم والمقاهي",
          "الأنشطة والتجارب",
          "مسار الرحلة والجدول اليومي",
        ],
      },
    },
  },
  reviews: {
    title: "آراء العملاء",
    subtitle: "هذه بعض من تجارب عملائنا الكرام عبر الواتس اب.",
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
      label: "أكثر من ألف عميل يثقون في أدلتنا السياحية",
      full: "أكثر من ألف عميل يثقون في أدلتنا السياحية",
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
        description:
          "يتم الدفع بشكل آمن وعالي التشفير بالتعاون مع بوابة دفع ستريم باي، وهي أفضل بوابة دفع سعودية.",
        imageAlt: "صفحة الدفع في StreamPay",
      },
      receive: {
        title: "استلم دليلك",
        description: "ننقلك مباشرة لصفحة تحميل دليلك بصيغة PDF.",
        imageAlt: "صفحة تحميل الدليل",
      },
    },
  },
  partner: {
    title: "بالشراكة مع نجوم السفر",
    body: "يسعدنا نعلن عن شراكتنا مع نجوم السفر لمساعدتك في حجز طيرانك وفندقك. تواصل معنا على الواتساب واحصل على عرض لرحلتك.",
    button: "تواصل معنا على الواتساب",
    whatsappMessage: "السلام عليكم، أبغى عرض لرحلتي عن طريق نجوم السفر.",
    logoAlt: "شعار نجوم السفر",
  },
  faqs: {
    title: "الأسئلة الشائعة",
    subtitle: "كل اللي تحتاج تعرفه قبل الشراء وبعده.",
    items: [
      {
        question: "كيف أستلم الدليل بعد الدفع؟",
        answer:
          "بعد ما تدفع ترجع مباشرة لصفحة التحميل، وأول ما يتأكد الدفع يظهر لك زر تحميل الدليل كملف PDF.",
      },
      {
        question: "كم مدة رابط التحميل؟",
        answer:
          "الرابط يشتغل لمدة 20 دقيقة بعد الدفع، وتقدر تحمّل الدليل حتى 3 مرات. احفظ الملف على جوالك أول ما تحمّله.",
      },
      {
        question: "انتهى الرابط قبل ما أحمّل الدليل، وش أسوي؟",
        answer: "تواصل معنا على الواتساب برقم طلبك ونرسل لك الدليل مرة ثانية.",
      },
      {
        question: "كيف أستخدم الدليل في رحلتي؟",
        answer: "الدليل ملف PDF تفتحه من جوالك، ولكل مكان رابطه على Google Maps. اضغط وامشِ.",
      },
      {
        question: "هل أحتاج إنترنت عشان أستخدمه؟",
        answer:
          "بعد التحميل يفتح الملف بدون إنترنت، أما روابط Google Maps فتحتاج اتصال عشان تفتح الخريطة.",
      },
      {
        question: "بأي لغة الأدلة؟",
        answer: "الأدلة مكتوبة باللغة العربية.",
      },
      {
        question: "هل الدفع آمن؟ وش طرق الدفع؟",
        answer:
          "الدفع يتم عبر StreamPay بشكل آمن، وتقدر تدفع بمدى أو Apple Pay أو فيزا أو ماستركارد.",
      },
      {
        question: "هل أقدر أسترجع المبلغ؟",
        answer:
          "الدليل ملف رقمي يوصلك فورًا، لذلك لا يمكن استرجاع المبلغ بعد الشراء. ولو واجهتك أي مشكلة في طلبك، تواصل معنا على الواتساب ونحلها لك.",
      },
    ],
    more: "عندك سؤال ثاني؟",
    whatsapp: "تواصل معنا على الواتساب",
    whatsappMessage: "السلام عليكم، عندي سؤال عن GuiderPlan.",
  },
  about: {
    title: "من أنا",
    lines: [
      "أنا غيث سلامة مؤسس GuiderPlan:",
      "أسّست هذا الموقع لأرشد السيّاح الخليجيين إلى أماكن مجرّبة اخترتها من واقع تجاربي الشخصية.",
      "هدفي أن أوفّر عليكم وقت التخطيط وعناءه لتستمتعوا برحلتكم.",
    ],
    name: "غيث سلامة",
    role: "مؤسس GuiderPlan",
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
