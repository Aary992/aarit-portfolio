export const profile = {
  name: "Aarit Shah",
  location: "South Bombay, India",
  roles: ["Founder", "Trader", "Creator"],
  email: "shahaarit2@gmail.com",
  phone: "+91 98199 75062",
  phoneRaw: "+919819975062",
  calendly: "https://calendly.com/shahaarit3/30min",
  domain: "https://www.aaritshah.com",
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
    label: "GitHub",
    handle: "@Aary992",
    href: "https://github.com/Aary992",
  },
  {
    label: "X",
    handle: "@withaarit",
    href: "https://x.com/withaarit",
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
  { value: "4M", label: "views / last 90 days" },
  { value: "22K", label: "followers" },
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
  storeUrl?: string;
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
    status: "Live on Google Play · 800+ users",
    year: "2026",
    description:
      "A live financial-literacy game for Indian Gen Z, now on the web and Android. Two learning tracks and 290+ short lessons sit alongside a daily money decision, a 32-decision Life simulator and ₹1,00,000 of simulated paper trading, with no brokerage account, no KYC and no real money at risk.",
    highlights: [
      "290+ short lessons",
      "32-decision Life simulator",
      "₹1L simulated paper trading",
    ],
    metrics: [
      { value: "800+", label: "users" },
      { value: "290+", label: "short lessons" },
      { value: "0", label: "real money at risk" },
    ],
    url: "https://marketplay.space",
    storeUrl: "https://play.google.com/store/apps/details?id=space.marketplay.twa",
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
    status: "Live Â· Phase 1",
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
    status: "Invite-only Â· launching",
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
  { name: "Markets Quantitative Analysis (MQA)", issuer: "Citi Â· Forage", date: "Mar 2026" },
  { name: "Quantitative Research", issuer: "J.P. Morgan Â· Forage", date: "Dec 2025" },
  { name: "Investment Banking", issuer: "JPMorgan Chase Â· Forage", date: "Dec 2025" },
  { name: "Risk", issuer: "Goldman Sachs Â· Forage", date: "Jan 2026" },
  { name: "Trading in the Zone (Elementary)", issuer: "GetTogetherFinance", date: "Jan 2026" },
  { name: "Volunteer", issuer: "World Hindu Economic Forum", date: "Dec 2025" },
];

export const marqueeItems = [
  "Derivatives",
  "Crypto",
  "AI agents",
  "Next.js",
  "Trading bots",
  "4M views / 90 days",
  "1,500-strong community",
  "Financial literacy",
  "Automation",
  "Equity research",
  "Obsidian second brain",
  "Web & app dev",
];

// Testimonials were removed on purpose: the previous entries were placeholder
// copy presented as genuine. The section returns only when there are real,
// attributable quotes (screenshots of community/LinkedIn praise, or quotes
// collected from webinar attendees).

/**
 * Primary nav: every section of the site, in reading order, with the link
 * that earns money last so it lands closest to the CTA. Nine items is a lot
 * for one bar, so the desktop row is compact and only appears at xl; every
 * width below that gets the full-screen menu, which handles a long list
 * better than a cramped row ever could.
 */
export const nav = [
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Building", href: "/building" },
  { label: "Investing", href: "/investing" },
  { label: "Side projects", href: "/side-projects" },
  { label: "Writing", href: "/writing" },
  { label: "Markets", href: "/markets-explained" },
  { label: "Certifications", href: "/certifications" },
  { label: "Work with me", href: "/work-with-me" },
];

/** Everything else, grouped for the footer. */
export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "The work",
    links: [
      { label: "Building", href: "/building" },
      { label: "Side projects", href: "/side-projects" },
      { label: "Investing", href: "/investing" },
      { label: "Work with me", href: "/work-with-me" },
    ],
  },
  {
    heading: "Read & use",
    links: [
      { label: "Markets, Explained", href: "/markets-explained" },
      { label: "Writing", href: "/writing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Journey", href: "/journey" },
      { label: "Speaking", href: "/speaking" },
      { label: "Certifications", href: "/certifications" },
      { label: "Press kit", href: "/press" },
    ],
  },
];

export type Service = {
  slug: string;
  name: string;
  pitch: string;
  engagement: string[];
  outcome: string;
  note?: string;
};

export const services: Service[] = [
  {
    slug: "ai-consultation",
    name: "AI consultation",
    pitch:
      "You know AI should be doing more for your business. I find where, and hand you the plan.",
    engagement: [
      "A 30-minute call to map what you do and where the hours actually go",
      "I audit the workflows worth automating, and tell you which ones aren't",
      "You get a scoped build plan: the tools, the agents, the order of attack",
    ],
    outcome:
      "A roadmap you can execute yourself, or hand straight back to me to build.",
  },
  {
    slug: "ai-builds",
    name: "AI tools & websites",
    pitch:
      "Custom tools, agent systems and websites, built end to end and shipped.",
    engagement: [
      "We scope it on a call: what it does, what it talks to, what done looks like",
      "I build it the way I build my own products, agent backends to frontends",
      "Handover with source code and a walkthrough, no forced retainer",
    ],
    outcome:
      "A working product you own outright, plus the ability to run it without me.",
  },
  {
    slug: "paid-promotions",
    name: "Paid promotions",
    pitch:
      "Your product in front of an audience that actually watches: 4M views in the last 90 days, 22K followers, a 1,500-person community.",
    engagement: [
      "Fit check first. If your product doesn't fit my audience, I'll say no",
      "We agree the format: reel, post, or a live walkthrough in my community",
      "I make it in my voice, because that's what my audience shows up for",
    ],
    outcome:
      "Distribution to a finance-and-AI-native Gen-Z audience, made by someone they already trust.",
    note: "I don't promote tips, signals, or anything that needs SEBI registration to sell.",
  },
  {
    slug: "content-work",
    name: "Content work",
    pitch:
      "The engine behind my output, pointed at your brand: scripts, carousels, or the whole pipeline.",
    engagement: [
      "A call on your voice, your audience and what the content has to do",
      "I draft with the same system that runs my channels every day",
      "We iterate until it sounds like you, not like a tool",
    ],
    outcome:
      "Content that ships consistently without you writing it, or the system so your team can.",
  },
];

/**
 * FAQ. Every answer is drawn from something already stated elsewhere on the
 * site, so there is one version of each fact rather than two that drift.
 * Doubles as the entity page that AI answer engines quote.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Who is Aarit Shah?",
    a: "I'm a founder, AI builder and trader based in South Bombay, Mumbai. I run three ventures: MarketPlay, a gamified financial literacy app for Indian Gen Z; GetAITrade, AI trading infrastructure with a human verification gate on every order; and 10x Founders, an invite-only room for young Mumbai builders. Alongside that I teach AI, markets and trading daily to a community of about 1,500 people.",
  },
  {
    q: "What can I hire you for?",
    a: "Four things: AI consultation, where I audit your workflows and hand you a build plan; AI tools and websites, built end to end and handed over with the source code; paid promotions to my audience; and content work, which is either the content itself or the system that produces it. There is no pricing page and no minimum budget. You send an enquiry, we do a free 30-minute call, and I tell you whether I can help.",
  },
  {
    q: "Are you SEBI registered?",
    a: "No, and it matters. Nothing I publish or sell is investment advice. I give no tips, no calls and no signals, and I don't manage anyone's money. What I sell is education, software and media. If what you need is a registered adviser, you need a registered adviser, not me. Anything I say about markets is how the mechanism works, not what you should buy.",
  },
  {
    q: "What is MarketPlay?",
    a: "A Duolingo-style financial literacy game for Indian Gen Z. Each scenario is a real market event where you make one irreversible decision and live with it. Behind it sits a backend of ten scoped AI agents gated behind human approval, a 21-module reel curriculum, more than 30 interactive calculators, a 32-decision life simulator and ₹1,00,000 of simulated paper trading. It's live on the web and Google Play, used by 800+ people, with no real money at risk.",
  },
  {
    q: "What is GetAITrade?",
    a: "AI-powered trading command infrastructure, live and tested with real funds. The design point is the human verification gate: the system can propose and prepare, but a person confirms before anything executes. It is infrastructure and tooling, not a signal service and not a managed product.",
  },
  {
    q: "What is Markets, Explained?",
    a: "A written series where I take one thing that happened in the market and explain the mechanism behind it in plain language: why capital rotated, what a company's balance sheet is really doing, why a price moved in the direction nobody expected. It is explanation after the fact, not prediction, and never a buy call.",
  },
  {
    q: "How do I actually get started working with you?",
    a: "Send the form on the Work with me page, or email me directly at shahaarit2@gmail.com. I read everything and reply within 24 hours, usually faster. If there's a fit, the next step is a free 30-minute call, and after that a written proposal with fixed scope so you know what you're getting before anything starts.",
  },
  {
    q: "Do you speak at events or run sessions?",
    a: "Yes. I've run seven webinars so far, on AI, trading, market basics and AI trading, mostly for my own community. If you want a session for your community, company or campus, the enquiry form is the way in.",
  },
];

export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "marketplays-ai-control-room",
    title: "Inside MarketPlay's AI control room: 10 agents, one approval gate",
    dek: "How I run a 10-agent backend for a live financial product without ever letting an agent act unsupervised.",
    category: "AI projects",
    date: "2026-07-20",
    readTime: "5 min read",
    body: [
      "MarketPlay is a financial literacy game, but the backend that runs it is closer to an AI operations team. Ten scoped agents handle the work: generating scenario copy, grading checkpoint tests, monitoring the paper-trading broker, flagging anomalies across the six-tab analytics dashboard, and more. None of them ship a change or take an action without passing through a human approval gate first.",
      "I built it this way on purpose. The product deals with a teenager's financial decisions, even in a paper-trading environment, so the cost of an unreviewed AI mistake is higher than in a typical side project. The control room is the compromise: agents do the grunt work at machine speed, I stay the single point of accountability for anything that touches a user.",
      "Each agent is scoped narrowly rather than given broad autonomy. One agent's job is to draft the next scenario in the reel curriculum, nothing else. Another watches the paper-trading broker's order flow for anything that looks like a bug in fills or settlement. Narrow scope makes each agent easier to audit, and easier to debug when something goes wrong, which it occasionally does.",
      "The pattern generalizes past MarketPlay. GetAITrade runs on the same philosophy applied to real trading infrastructure: broker connectivity and Telegram routing handled by AI, but every live order still passes a human verification gate before it executes. Human-in-the-loop isn't a compliance checkbox for me, it's the actual design principle that makes me comfortable putting AI in front of anyone's money.",
      "I designed, built and shipped every layer of MarketPlay's control room solo. If you're building anything where AI touches financial decisions, the lesson I'd pass on is simple: decide what the agent is never allowed to do before you decide what it's allowed to do.",
    ],
  },
  {
    slug: "why-i-built-an-ai-trade-journal",
    title: "Why I built my own AI trade journal instead of paying for Tradezella",
    dek: "Screenshot in, fully logged trade out. No manual entry, no monthly subscription.",
    category: "AI trading",
    date: "2026-07-13",
    readTime: "4 min read",
    body: [
      "Every serious trader eventually hits the same wall: you know you should journal every trade, and you almost never do it, because manual entry is tedious and breaks your flow the moment the market moves. I hit that wall enough times that I built my way out of it.",
      "The AI Trade Journal works off a single screenshot. Send a trade confirmation to a Telegram bot and the AI reads it, extracts the entry, exit, size and instrument, and logs the entire trade automatically. No forms, no manual data entry, no excuse to skip a day.",
      "The dashboard mimics what Tradezella charges a subscription for: net P&L, win rate, profit factor, average R, an equity curve, and a full P&L calendar. The difference is it's mine, it's free to run, and it's wired directly into the same AI-agent thinking behind MarketPlay and GetAITrade: narrow tool, single job, no unnecessary complexity.",
      "It's live at ai-trade-journal-delta.vercel.app. I built it for myself first, the way most of my side projects start: I wanted something that didn't exist yet in the shape I wanted it, so I shipped it over a weekend and kept using it because it actually worked.",
    ],
  },
  {
    slug: "teaching-1500-people-ai-and-trading",
    title: "What I actually teach in daily webinars to 1,500 people",
    dek: "No tips, no signals, just how markets and AI actually work, every single day.",
    category: "AI training",
    date: "2026-06-29",
    readTime: "4 min read",
    body: [
      "I run daily webinars for a community of 1,500-plus people on AI, markets and trading. I'm not SEBI registered, and every session starts with the same line: I will never give a tip or a signal. What I will do is show you exactly how I think through a decision, and teach you enough that you don't need me, or anyone else, to hand you one.",
      "The AI half of it covers what I'm actually building: how agents are scoped and gated in MarketPlay's control room, how the AI Trade Journal turns a screenshot into a fully logged trade, how GetAITrade routes orders through a human-verification gate. I teach from real, shipped systems, not theory.",
      "The markets half is value investing and systematic crypto trading, the same two disciplines I run my own capital through: screen for mispriced businesses, tear apart the financials before committing a rupee, demand a real moat, then manage the position as price moves. On the crypto side it's rules-based entries and exits with risk capped per trade, never a single bet on a single idea.",
      "The content itself runs through a pipeline I built myself, the same content engine that turns daily inputs into scripts and posts behind 4 million views in the last 90 days. Teaching daily only works if the system behind it doesn't depend on me having a good day. I'd rather build the machine than rely on willpower.",
    ],
  },
];

export type SideProject = {
  name: string;
  category: string;
  desc: string;
  href?: string;
};

export const sideProjects: SideProject[] = [
  {
    name: "Self-improving second brain",
    category: "Knowledge",
    desc: "A fully-built Obsidian OS that auto-scrapes viral reels, LinkedIn posts and podcasts, distils them into a structured knowledge graph, runs a nightly synthesis pass across every note, and quizzes me with active recall to test what actually stuck.",
  },
  {
    name: "AI Trade Journal",
    category: "Trading",
    desc: "Send one screenshot to a Telegram bot and the AI logs the entire trade for you, no manual entry. The dashboard mimics Tradezella: net P&L, win rate, profit factor, avg R, equity curve, a full P&L calendar.",
    href: "https://ai-trade-journal-delta.vercel.app",
  },
  {
    name: "Research-analyst bots",
    category: "Automation",
    desc: "Auto-bots that do the grunt work of equity and crypto research: screening, summarising and flagging, so I act on signal, not noise.",
  },
  {
    name: "Financial models & research",
    category: "Investing",
    desc: "Custom-built valuation and DCF models that tear a business apart before I commit a rupee, alongside whatever research tooling the off-the-shelf products don't offer.",
  },
  {
    name: "The content engine",
    category: "Growth",
    desc: "A pipeline that turns my daily inputs into scripts and posts, the system behind 4M views in 90 days.",
  },
  {
    name: "Vibecoded, shipped, forgotten",
    category: "Everything else",
    desc: "Internal tools, dashboards and weekend experiments I vibecode and ship just to see if I can, most of them without ever telling anyone.",
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
    label: "Equity Â· value investing",
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
    label: "Crypto Â· CFDs",
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

/**
 * `breakdown` is the real-project version of a case study: the problem, how it
 * was approached, how it is put together, and the calls that could have gone
 * the other way. No invented client numbers and no fabricated outcomes, since
 * a made-up result collapses the moment someone asks for a reference.
 */
export type Breakdown = {
  problem: string;
  approach: string;
  architecture: { label: string; detail: string }[];
  decisions: { call: string; why: string }[];
};

export const ventureDetail: Record<
  string,
  {
    longDescription: string;
    features: { title: string; desc: string }[];
    breakdown?: Breakdown;
  }
> = {
  marketplay: {
    longDescription:
      "MarketPlay is live on the web and Google Play, used by 800+ people, and it turns the thing that scares most teenagers, money, into a game they actually want to play. A real market event drops as a fullscreen takeover, you make one irreversible call, Defensive, Balanced or Bold, and a six-beat cinematic reveal shows exactly what it did to your net worth. That loop sits inside a full product: a 21-module curriculum across Money Basics and Stock Market delivered as TikTok-style vertical reels with gated checkpoint tests, 30+ interactive calculator chapters you drag sliders through, a 32-decision life simulator that ages you through financial stages, and a paper-trading module with ₹1,00,000 of simulated money and a real simulated broker, order validation, fills, settlement, live P&L. Behind it all is a founder control room: a six-tab analytics command center and a control plane for 10 scoped AI agents running the backend with human approval on everything. I designed, built and shipped every layer of it myself.",
    features: [
      { title: "Gamified scenario engine", desc: "Fullscreen market events, one irreversible call, and a paced six-beat cinematic result reveal." },
      { title: "21-module reel curriculum", desc: "TikTok-style vertical lessons across Money Basics and Stock Market, gated behind checkpoint tests." },
      { title: "30+ interactive calculators", desc: "Drag-the-slider chapters on FDs, tax, RSI, MACD, Bollinger Bands and Fibonacci with custom-built visualizations." },
      { title: "32-decision Life simulator", desc: "Ages you through financial life stages across 32 decisions and charts your net worth over time. Next up: an avatar whose look evolves with it." },
      { title: "Real paper trading", desc: "₹1,00,000 of simulated money through a working simulated broker: order validation, fills, settlement, positions and day P&L, no brokerage account and no KYC." },
      { title: "Founder control room", desc: "A six-tab analytics command center plus a control plane for 10 AI agents, every action gated by human approval." },
    ],
    breakdown: {
      problem:
        "Financial literacy content for Indian teenagers is either a textbook or a finfluencer telling them what to buy. Both fail for the same reason: neither lets you be wrong cheaply. Nobody learns what risk feels like by reading a definition of it, and nobody should learn it with real money at eighteen.",
      approach:
        "Make the decision irreversible and make the consequence vivid. A real market event drops as a fullscreen takeover, you pick Defensive, Balanced or Bold, and you cannot undo it. A six-beat reveal then walks through exactly what that call did to your net worth. Everything else in the product exists to support that loop: the curriculum teaches the concept, the calculators let you feel the maths, paper trading lets you rehearse the mechanics, and the life simulator stretches the consequence across decades.",
      architecture: [
        {
          label: "Scenario engine",
          detail:
            "Real market events modelled as branching decisions with a scored outcome, paced through a six-beat reveal rather than dumped as a result screen.",
        },
        {
          label: "21-module reel curriculum",
          detail:
            "Vertical, TikTok-shaped lessons across Money Basics and Stock Market, gated behind checkpoint tests so modules unlock rather than being skimmed.",
        },
        {
          label: "30+ calculator chapters",
          detail:
            "FDs, tax, RSI, MACD, Bollinger Bands and Fibonacci, each as a drag-the-slider visualisation built from scratch instead of a form with a submit button.",
        },
        {
          label: "Simulated broker",
          detail:
            "Order validation, fills, settlement, positions and day P&L. A real state machine, because a fake one teaches habits that break on a real broker.",
        },
        {
          label: "10-agent backend",
          detail:
            "Scoped AI agents handling operational work behind a control plane, with a human approval gate on every action they take.",
        },
        {
          label: "Founder control room",
          detail:
            "A six-tab analytics command centre over the whole product, which is also how the agent layer is supervised.",
        },
      ],
      decisions: [
        {
          call: "Every agent action needs human approval",
          why: "An agent layer that can act unsupervised is a liability on a product aimed at teenagers. The approval gate costs speed and buys the ability to sleep.",
        },
        {
          call: "One irreversible decision per scenario, no undo",
          why: "An undo button turns a lesson about consequences into a lesson about optimisation. The discomfort is the teaching mechanism.",
        },
        {
          call: "Built the calculators rather than embedding existing ones",
          why: "Off-the-shelf calculators are forms. The thing that teaches is watching the curve move as you drag, which needs custom visualisation.",
        },
        {
          call: "Paper trading models settlement, not just price",
          why: "Most simulators skip the boring parts, which are exactly the parts that surprise people on their first real trade.",
        },
      ],
    },
  },
  getaitrade: {
    longDescription:
      "GetAITrade is trading-command infrastructure that lets you operate your broker through AI, from web or Telegram, with audit logging and a human verification gate on every order. Phase one is live and tested with real funds: the AI never acts without consent.",
    features: [
      { title: "Broker connectivity", desc: "Connect your broker and route typed, inspectable trade intents." },
      { title: "Human-in-the-loop", desc: "Every live order passes an approval gate, safety by design." },
      { title: "Audit everything", desc: "Full logging and dry-run-by-default, so nothing happens in the dark." },
    ],
    breakdown: {
      problem:
        "Letting an AI talk to a broker is easy to demo and hard to make safe. The demo version places orders from natural language and looks like magic. The production version has to answer a harder question: what happens the one time the model misreads the instruction and the money is real.",
      approach:
        "Treat the AI as something that prepares work, never something that commits it. Instructions become typed, inspectable trade intents rather than direct broker calls, and every live order stops at a human verification gate. Dry run is the default, so the safe path is the one you get by doing nothing special.",
      architecture: [
        {
          label: "Typed trade intents",
          detail:
            "Natural language resolves into a structured, inspectable intent object before anything touches a broker API, so the thing being approved is legible.",
        },
        {
          label: "Human verification gate",
          detail:
            "Every live order requires explicit consent. The system can prepare and explain, it cannot commit.",
        },
        {
          label: "Web and Telegram surfaces",
          detail:
            "The same intent pipeline behind both, because the approval step has to be identical wherever the instruction came from.",
        },
        {
          label: "Audit logging",
          detail:
            "Full logging with dry-run by default, so every action has a record and nothing executes silently.",
        },
      ],
      decisions: [
        {
          call: "No autonomous execution, at any tier",
          why: "It is the feature most requested and the one that turns a tool into a fiduciary problem. Not being SEBI registered makes that line non-negotiable rather than merely cautious.",
        },
        {
          call: "Dry run is the default mode",
          why: "Defaults are the real safety mechanism. If the safe path needs a flag, someone eventually forgets the flag.",
        },
        {
          call: "Tested with real funds before widening access",
          why: "Paper testing hides the failures that only appear with real fills, real slippage and real latency.",
        },
      ],
    },
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
