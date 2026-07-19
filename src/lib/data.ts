export const profile = {
  name: "Aarit Shah",
  location: "South Bombay, India",
  roles: ["Founder", "Trader", "Creator"],
  email: "shahaarit2@gmail.com",
  phone: "+91 98199 75062",
  phoneRaw: "+919819975062",
  calendly: "https://calendly.com/shahaarit3/30min",
  domain: "https://aaritshah.com",
  // Drop your resume PDF at public/aarit-shah-cv.pdf for this button to work.
  cv: "/aarit-shah-cv.pdf",
};

export const socials = [
  {
    label: "LinkedIn",
    handle: "Aarit Shah",
    href: "https://www.linkedin.com/in/aarit-shah-7a1a56395/",
  },
  {
    label: "Instagram",
    handle: "@withaarit",
    href: "https://instagram.com/withaarit",
  },
  {
    label: "Email",
    handle: "shahaarit2@gmail.com",
    href: "mailto:shahaarit2@gmail.com",
  },
];

export const heroStats = [
  { value: "2.7M", label: "monthly views" },
  { value: "23K", label: "followers / 30 days" },
  { value: "52%", label: "CAGR on stock portfolio*" },
  { value: "3", label: "ventures building" },
];

export type Metric = { value: string; label: string };

export type Venture = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  note?: string;
  status: string;
  year: string;
  description: string;
  highlights: string[];
  metrics: Metric[];
  url: string;
  accent: string;
  image: string;
  gallery?: { src: string; alt: string }[];
  logo?: string;
};

export const ventures: Venture[] = [
  {
    slug: "marketplay",
    name: "MarketPlay",
    tagline: "A financial life in your pocket, one irreversible call at a time.",
    role: "Founder & CEO",
    note: "built solo",
    status: "Pre-launch · waitlist open",
    year: "2026",
    description:
      "A Duolingo-style financial literacy game for Indian Gen Z. A real market event drops, you make one irreversible call, and an AI plays out the consequence on your net worth, backed by a 21-module reel-based curriculum, 30+ interactive calculators and a fully working paper-trading broker.",
    highlights: [
      "Gamified scenario engine",
      "21-module reel curriculum",
      "Paper trading, real broker logic",
      "Founder control room",
    ],
    metrics: [
      { value: "21", label: "learning modules" },
      { value: "30+", label: "interactive calculators" },
      { value: "10", label: "AI agents running the backend" },
      { value: "0", label: "real money at risk" },
    ],
    url: "https://marketplay.space",
    accent: "#8b5cf6",
    image: "/marketplay-app-scenario.webp",
    gallery: [
      { src: "/marketplay-app-home.webp", alt: "MarketPlay home dashboard" },
      { src: "/marketplay-app-scenario.webp", alt: "MarketPlay scenario decision screen" },
      { src: "/marketplay-app-learn.webp", alt: "MarketPlay reel-based learning feed" },
    ],
    logo: "/marketplay-logo.png",
  },
  {
    slug: "getaitrade",
    name: "GetAITrade",
    tagline: "The smarter way to trade, AI command infrastructure.",
    role: "Co-founder",
    status: "Live · Phase 1",
    year: "2026",
    description:
      "AI-powered trading command infrastructure with broker connectivity, Telegram routing, audit logging and controlled, human-verified execution. Tested live with real funds.",
    highlights: ["Broker connectivity", "Telegram routing", "Human-in-the-loop"],
    metrics: [
      { value: "99.8%", label: "routing accuracy" },
      { value: "320ms", label: "avg latency" },
      { value: "1,000+", label: "traders" },
    ],
    url: "https://getaitrade.com",
    accent: "#22d3ee",
    image: "/getaitrade-ss.png",
  },
  {
    slug: "10x-founders",
    name: "10x Founders",
    tagline: "Access is earned. Not bought.",
    role: "Co-founder",
    status: "Invite-only · launching",
    year: "2026",
    description:
      "An invite-only ecosystem for young founders in Mumbai building with intensity and discretion. Curated introductions and real rooms, no crowded mixers, no pitch theatre.",
    highlights: ["Invite-only", "Curated intros", "Mumbai"],
    metrics: [
      { value: "<25", label: "founders only" },
      { value: "Mumbai", label: "the room" },
    ],
    url: "https://10xfounders.vercel.app",
    accent: "#c9a24b",
    image: "/10xfounders-ss.png",
    logo: "/10xfounders-logo.jpeg",
  },
];

export const lab = [
  {
    name: "Research-analyst bots",
    desc: "Auto-bots that do the grunt work of equity and crypto research for me.",
  },
  {
    name: "Self-improving second brain",
    desc: "An Obsidian system that auto-scrapes viral reels, LinkedIn posts and podcasts, then learns from them.",
  },
  {
    name: "Custom internal tools",
    desc: "I build the websites and automations for everything I run.",
  },
];

export const community = {
  size: "1,500+",
  title: "A community I lead, not a signal group.",
  desc: "Leading has always come naturally to me, whether that's captaining my football team or running daily webinars on AI, markets and trading for a community of 1,500+. Every message states it plainly: I'm not SEBI registered, and I'll never give a tip or a signal. Just education, and leadership by example.",
};

export const experience = [
  {
    role: "Founder",
    org: "10x Founders",
    period: "Jun 2026 - Present",
    desc: "Launched this month: an invite-only room for young Mumbai founders who are actually building. Curating the people, the introductions and the rooms.",
    tags: ["Community", "Founders", "Mumbai"],
  },
  {
    role: "Founder",
    org: "GetAITrade",
    period: "2026 - Present",
    desc: "Co-building AI trading-command infrastructure with my team: broker connectivity, human-verified execution and full audit logging.",
    tags: ["AI", "Trading", "Product"],
  },
  {
    role: "Founder & CEO",
    org: "MarketPlay",
    period: "Apr 2026 - Present",
    desc: "Reimagining how the next generation learns finance, building MarketPlay end to end.",
    tags: ["AI", "Financial markets", "Product"],
  },
  {
    role: "Editor, Youth Market Insights",
    org: "Self-employed",
    period: "Nov 2025 - Jun 2026",
    desc: "Breaking down markets, money and financial literacy for Gen Z in plain language.",
    tags: ["Writing", "SEO", "Markets"],
  },
  {
    role: "AI Finance Intern",
    org: "Concept Investwell Pvt. Ltd.",
    period: "Mar 2026 - May 2026",
    desc: "Built internal AI tools to automate workflows and improve operational efficiency for the investment team.",
    tags: ["AI", "Portfolio management"],
  },
];

export const education = [
  {
    period: "2025 - 2027",
    institution: "KC College, Churchgate",
    detail: "Commerce",
    note: "Pursuing commerce at one of Mumbai's best-known colleges, in the heart of South Bombay.",
    tags: ["Commerce", "Finance", "South Bombay"],
  },
  {
    period: "2011 - 2025",
    institution: "MET Rishikul Vidyalaya",
    detail: "Class X boards",
    note: "90% across my top five subjects and 87% aggregate across all seven: Physics, Chemistry, Biology, Maths, Business Studies, English and Hindi.",
    tags: ["90% (top 5)", "87% aggregate"],
  },
];

export const vision = {
  intro:
    "I'm playing a long game. Over the next five years I want every venture firing, full financial independence, and a portfolio compounding hard, all in service of building something that lasts and giving back at a scale nobody has seen.",
  goals: [
    {
      title: "Financial independence",
      desc: "Fully financially independent within five years, without ever slowing down on building.",
    },
    {
      title: "Build the empire",
      desc: "Take MarketPlay, GetAITrade and 10x Founders as far as they can go, and grow a powerful, genuine circle around them.",
    },
    {
      title: "Compound relentlessly",
      desc: "Stay active across investments and trading, targeting 500-700% on my overall portfolio over five years while I keep reinvesting.",
    },
    {
      title: "Discipline & mastery",
      desc: "Sharpen my trading discipline and skill every single day. The edge comes from the reps.",
    },
    {
      title: "Give it all back",
      desc: "Use all of it to become one of the most serious philanthropists the world has ever seen.",
    },
  ],
};

export const skills = [
  {
    group: "Markets & trading",
    items: ["Derivatives", "Day trading", "Crypto", "Equity research", "Technical analysis", "Portfolio mgmt"],
  },
  {
    group: "AI & automation",
    items: ["AI agents", "Trading bots", "Research bots", "Automation", "Prompt engineering"],
  },
  {
    group: "Building",
    items: ["Web & app dev", "Next.js", "Full-stack", "Rapid prototyping"],
  },
  {
    group: "Content & growth",
    items: ["Short-form video", "LinkedIn", "Community", "Newsletter", "SEO"],
  },
];

export const certifications = [
  { name: "Markets Quantitative Analysis (MQA)", issuer: "Citi · Forage", date: "Mar 2026" },
  { name: "Quantitative Research", issuer: "J.P. Morgan · Forage", date: "Dec 2025" },
  { name: "Investment Banking", issuer: "JPMorgan Chase · Forage", date: "Dec 2025" },
  { name: "Risk", issuer: "Goldman Sachs · Forage", date: "Jan 2026" },
  { name: "Trading in the Zone (Elementary)", issuer: "GetTogetherFinance", date: "Jan 2026" },
  { name: "Volunteer", issuer: "World Hindu Economic Forum", date: "Dec 2025" },
];

export const marqueeItems = [
  "Derivatives",
  "Crypto",
  "AI agents",
  "Next.js",
  "Trading bots",
  "2.7M monthly views",
  "1,500-strong community",
  "Financial literacy",
  "Automation",
  "Equity research",
  "Obsidian second brain",
  "Web & app dev",
];

// EDIT ME — replace quote/author with real community feedback, and
// swap `image` for a real photo URL (or /public path) when you have them.
const avatarPlaceholder = (hex: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='240' height='240' fill='%23141416'/%3E%3Ccircle cx='120' cy='92' r='52' fill='%23${hex}' opacity='0.22'/%3E%3Crect x='34' y='150' width='172' height='150' rx='86' fill='%23${hex}' opacity='0.18'/%3E%3C/svg%3E`;

export const testimonials = [
  {
    quote:
      "Aarit's approach is a game-changer for those without a finance background. The live demo made complex AI concepts actionable, and I'm already looking forward to future sessions.",
    author: "Community member",
    image: avatarPlaceholder("f59e0b"),
    alt: "Community member portrait",
  },
  {
    quote:
      "Went from scared of charts to running my own risk-free paper-trading routine in a month.",
    author: "Community member",
    image: avatarPlaceholder("ff6b1a"),
    alt: "Community member portrait",
  },
  {
    quote:
      "Finally, content that is crisp, direct, and genuinely informative. This session provided a great foundation, and I'm eager to see how these AI-driven strategies evolve.",
    author: "Community member",
    image: avatarPlaceholder("c9a24b"),
    alt: "Community member portrait",
  },
];

export const nav = [
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Building", href: "/building" },
  { label: "Investing", href: "/investing" },
  { label: "Side projects", href: "/side-projects" },
  { label: "Certifications", href: "/certifications" },
];

export const sideProjects = [
  {
    name: "Research-analyst bots",
    category: "Automation",
    desc: "Auto-bots that do the grunt work of equity and crypto research: screening, summarising and flagging, so I act on signal, not noise.",
  },
  {
    name: "Self-improving second brain",
    category: "Knowledge",
    desc: "An Obsidian system that auto-scrapes viral reels, LinkedIn posts and podcasts, distils them, and gets sharper every day.",
  },
  {
    name: "Trading & journaling dashboards",
    category: "Web",
    desc: "Internal dashboards for my own trading, with live data, journals and automations wired into one place.",
  },
  {
    name: "The content engine",
    category: "Growth",
    desc: "A pipeline that turns my daily inputs into scripts and posts, the system behind 2.7M views a month.",
  },
];

export const forFun = [
  {
    name: "Productivity websites",
    category: "For fun",
    desc: "I build small productivity tools and websites just because I enjoy it, scratching my own itch and shipping something useful by the weekend.",
  },
  {
    name: "Learning AI",
    category: "For fun",
    desc: "I learn AI for fun: agents, automations, prompt engineering, and wire whatever I learn straight back into the things I'm building.",
  },
  {
    name: "Podcasts & deep dives",
    category: "For fun",
    desc: "I watch podcasts and long-form deep dives constantly, mining them for ideas on markets, building and how people actually think.",
  },
  {
    name: "Learning, constantly",
    category: "For fun",
    desc: "I learn a lot of things for the sake of it. The compounding curiosity is the point. New rabbit hole every week.",
  },
];

export const newsletter = {
  title: "I write a newsletter, too.",
  desc: "Markets, building and the occasional rabbit hole, distilled into one honest email. No tips, no signals, just how I'm thinking.",
  cta: "Subscribe on LinkedIn",
  href: "https://www.linkedin.com/newsletters/youth-market-insights-7406681601700614144/",
};

export const investing = {
  intro:
    "I invest the way I build: slowly, with conviction, and only after I fully understand what I'm holding. Equity is value investing. Crypto is systematic. Both are run with risk in mind first.",
  equity: {
    label: "Equity · value investing",
    title: "Find it cheap. Understand it deeply. Hold the moat.",
    intro:
      "I'm a value investor. I hunt for genuinely undervalued businesses, tear their financials apart before I commit a rupee, and only buy what has a real, durable moat, then I manage the position actively as the price moves.",
    process: [
      {
        step: "01",
        title: "Find the undervalued",
        desc: "Screen relentlessly for businesses the market has mispriced, where price and intrinsic value have drifted apart.",
      },
      {
        step: "02",
        title: "Break down the financials",
        desc: "Fully tear the stock apart: balance sheet, cash flows, margins, debt, all before conviction. No financials, no position.",
      },
      {
        step: "03",
        title: "Demand a moat",
        desc: "Only buy businesses with a durable competitive advantage: pricing power, network effects, brand, cost edge.",
      },
      {
        step: "04",
        title: "Strategically trim",
        desc: "Scale positions as the price changes: trim into strength, add into weakness, lock gains and keep risk in check.",
      },
    ],
    stats: [
      { value: "52%", label: "my portfolio CAGR*" },
      { value: "30-35%", label: "family portfolios CAGR*" },
      { value: "3", label: "family portfolios managed" },
      { value: "Value", label: "investing style" },
    ],
  },
  crypto: {
    label: "Crypto · CFDs",
    title: "Systematic, multi-strategy, risk-first.",
    intro:
      "Alongside equities I trade crypto CFDs using multiple strategies, never a single bet on a single idea. The mix changes with the market, but the rules don't.",
    points: [
      "Rules-based entries and exits, no impulse trades.",
      "Every position is pre-sized, with risk per trade capped.",
      "Leverage is a tool to be respected, not abused.",
    ],
  },
  disclaimer:
    "Personal track record, shared for transparency and education only. CAGR figures are my own and my family's portfolios. Not SEBI registered. Nothing here is advice, a tip, a call or a signal. CFDs and leverage carry significant risk.",
};

export const ventureDetail: Record<
  string,
  { longDescription: string; features: { title: string; desc: string }[] }
> = {
  marketplay: {
    longDescription:
      "MarketPlay turns the thing that scares most teenagers, money, into a game they actually want to play. A real market event drops as a fullscreen takeover, you make one irreversible call, Defensive, Balanced or Bold, and a six-beat cinematic reveal shows exactly what it did to your net worth. That loop sits inside a full product: a 21-module curriculum across Money Basics and Stock Market delivered as TikTok-style vertical reels with gated checkpoint tests, 30+ interactive calculator chapters you drag sliders through, a life simulator that ages you through financial stages, and a paper-trading module with a real simulated broker, order validation, fills, settlement, live P&L. Behind it all is a founder control room: a six-tab analytics command center and a control plane for 10 scoped AI agents running the backend with human approval on everything. I designed, built and shipped every layer of it myself.",
    features: [
      { title: "Gamified scenario engine", desc: "Fullscreen market events, one irreversible call, and a paced six-beat cinematic result reveal." },
      { title: "21-module reel curriculum", desc: "TikTok-style vertical lessons across Money Basics and Stock Market, gated behind checkpoint tests." },
      { title: "30+ interactive calculators", desc: "Drag-the-slider chapters on FDs, tax, RSI, MACD, Bollinger Bands and Fibonacci with custom-built visualizations." },
      { title: "Life simulator", desc: "Ages you through financial life stages and charts your net worth over time. Next up: an avatar whose look evolves with it." },
      { title: "Real paper trading", desc: "A working simulated broker: order validation, fills, settlement, positions and day P&L, not a toy." },
      { title: "Founder control room", desc: "A six-tab analytics command center plus a control plane for 10 AI agents, every action gated by human approval." },
    ],
  },
  getaitrade: {
    longDescription:
      "GetAITrade is trading-command infrastructure that lets you operate your broker through AI, from web or Telegram, with audit logging and a human verification gate on every order. Phase one is live and tested with real funds: the AI never acts without consent.",
    features: [
      { title: "Broker connectivity", desc: "Connect your broker and route typed, inspectable trade intents." },
      { title: "Human-in-the-loop", desc: "Every live order passes an approval gate, safety by design." },
      { title: "Audit everything", desc: "Full logging and dry-run-by-default, so nothing happens in the dark." },
    ],
  },
  "10x-founders": {
    longDescription:
      "10x Founders is an invite-only room for young Mumbai founders who are actually building, not networking for its own sake. Curated introductions, real rooms, and a membership that's earned. No crowded mixers, no pitch theatre.",
    features: [
      { title: "Invite-only", desc: "A curated membership of builders, operators and leaders under 25." },
      { title: "Curated intros", desc: "One warm introduction worth a hundred cold DMs." },
      { title: "Real rooms", desc: "Rooftops in Colaba, villas in Alibaug. The room is defined by who's in it." },
    ],
  },
};
