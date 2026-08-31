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
    tagline: "Learn how money works by making decisions and seeing what follows.",
    role: "Founder & CEO",
    note: "built solo",
    status: "Live on Google Play · 800+ users",
    year: "2026",
    description:
      "A financial literacy game for Indian Gen Z, available on the web and Android. It has two learning tracks, 290+ short lessons, a daily money decision, a 32-decision Life simulator and ₹1,00,000 in simulated paper trading. It does not require a brokerage account or KYC, and no real money is at risk.",
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
    tagline: "Prepare trades from the web or Telegram, then confirm every order yourself.",
    role: "Co-founder",
    status: "Live Â· Phase 1",
    year: "2026",
    description:
      "A trading tool that connects to brokers, accepts instructions from the web or Telegram, keeps an audit log and asks for confirmation before every order. It has been tested with real funds.",
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
    tagline: "An invite-only room for young founders in Mumbai.",
    role: "Co-founder",
    status: "Invite-only Â· launching",
    year: "2026",
    description:
      "An invite-only group for young founders in Mumbai. It is built around considered introductions and small in-person gatherings rather than crowded mixers or pitch events.",
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
    name: "Research tools",
    desc: "Tools that screen, summarise and flag equity and crypto research for me.",
  },
  {
    name: "Obsidian research library",
    desc: "An Obsidian setup that collects useful reels, LinkedIn posts and podcasts and organises what I learn from them.",
  },
  {
    name: "Custom internal tools",
    desc: "I build the websites and small automations I use in my own work.",
  },
];

export const community = {
  size: "1,500+",
  title: "A learning community, not a signal group.",
  desc: "I run daily webinars on software, markets and trading for a community of more than 1,500 people. Every session comes with the same clear boundary: I'm not SEBI registered, and I don't give tips or signals. I explain what I know and show how I approach the work.",
};

export const experience = [
  {
    role: "Founder",
    org: "10x Founders",
    period: "Jun 2026 - Present",
    desc: "Started an invite-only group for young Mumbai founders, with a focus on small gatherings and considered introductions.",
    tags: ["Community", "Founders", "Mumbai"],
  },
  {
    role: "Founder",
    org: "GetAITrade",
    period: "2026 - Present",
    desc: "Building GetAITrade with my team: broker connections, confirmation before every order and a complete audit log.",
    tags: ["AI", "Trading", "Product"],
  },
  {
    role: "Founder & CEO",
    org: "MarketPlay",
    period: "Apr 2026 - Present",
    desc: "Building MarketPlay from product design through development to help young people learn finance by making decisions.",
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
    desc: "Built internal tools to automate repetitive work for the investment team.",
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
    "Over the next five years, I want to become financially independent, keep building my three ventures, grow my investment portfolio and use the results to give back.",
  goals: [
    {
      title: "Financial independence",
      desc: "Become financially independent within five years while continuing to build.",
    },
    {
      title: "Grow the ventures",
      desc: "Keep developing MarketPlay, GetAITrade and 10x Founders, and build a genuine circle around them.",
    },
    {
      title: "Keep investing",
      desc: "Stay active in investing and trading, with a target of 500-700% growth across my overall portfolio over five years while reinvesting the returns.",
    },
    {
      title: "Improve the craft",
      desc: "Work on my trading discipline and decision-making every day through consistent practice.",
    },
    {
      title: "Give back",
      desc: "Use what I build and earn to support causes that matter to me.",
    },
  ],
};

export const skills = [
  {
    group: "Markets & trading",
    items: ["Derivatives", "Day trading", "Crypto", "Equity research", "Technical analysis", "Portfolio mgmt"],
  },
  {
    group: "Software & automation",
    items: ["Task automation", "Trading tools", "Research tools", "Workflow design", "Prompt design"],
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
  "Task automation",
  "Next.js",
  "Trading tools",
  "4M views / 90 days",
  "1,500-strong community",
  "Financial literacy",
  "Automation",
  "Equity research",
  "Obsidian research library",
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
    name: "Workflow consultation",
    pitch:
      "I review how your business works, identify the repetitive parts worth automating and give you a practical plan.",
    engagement: [
      "A 30-minute call to understand what you do and where the time goes",
      "I review which workflows are worth automating and which are better left alone",
      "You get a scoped plan covering the tools, responsibilities and order of work",
    ],
    outcome:
      "A plan you can follow yourself or ask me to build.",
  },
  {
    slug: "ai-builds",
    name: "Custom tools & websites",
    pitch:
      "I design and build focused tools, automations and websites for a specific job.",
    engagement: [
      "We define what it needs to do, what it connects to and what finished means",
      "I build and test the product, from the background processes to the interface",
      "You receive the source code and a walkthrough, with no required retainer",
    ],
    outcome:
      "A working product you own and can run without me.",
  },
  {
    slug: "paid-promotions",
    name: "Paid promotions",
    pitch:
      "I can introduce a relevant product to an audience that generated 4M views in the last 90 days and includes 22K followers and a 1,500-person community.",
    engagement: [
      "I first check whether the product is relevant to my audience, and say no if it isn't",
      "We agree the format: reel, post, or a live walkthrough in my community",
      "I create the reel, post or walkthrough in my usual voice",
    ],
    outcome:
      "A sponsored piece shared with my audience across the agreed format.",
    note: "I don't promote tips, signals, or anything that needs SEBI registration to sell.",
  },
  {
    slug: "content-work",
    name: "Content work",
    pitch:
      "I can write scripts and carousels for your brand, or help set up the process your team will use to produce them.",
    engagement: [
      "A call on your voice, your audience and what the content has to do",
      "I draft using the same process I use for my own channels",
      "We revise it until the language sounds like you",
    ],
    outcome:
      "Finished content, or a repeatable process your team can use.",
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
    a: "I'm a founder and trader based in South Bombay, Mumbai. I run three ventures: MarketPlay, a financial literacy game for Indian Gen Z; GetAITrade, a trading tool that requires confirmation before every order; and 10x Founders, an invite-only group for young Mumbai founders. I also teach software, markets and trading to a community of about 1,500 people.",
  },
  {
    q: "What can I hire you for?",
    a: "You can hire me to review and automate workflows, build custom tools and websites, create a paid promotion for my audience or help with content. There is no public pricing page or minimum budget. Send an enquiry and we'll use a free 30-minute call to work out whether I can help.",
  },
  {
    q: "Are you SEBI registered?",
    a: "No, and it matters. Nothing I publish or sell is investment advice. I give no tips, no calls and no signals, and I don't manage anyone's money. What I sell is education, software and media. If what you need is a registered adviser, you need a registered adviser, not me. Anything I say about markets is how the mechanism works, not what you should buy.",
  },
  {
    q: "What is MarketPlay?",
    a: "MarketPlay is a financial literacy game for Indian Gen Z, available on the web and Google Play and used by more than 800 people. Each scenario uses a real market event, asks you to make one irreversible decision and shows the result. It also includes 290+ short lessons, more than 30 interactive calculators, a 32-decision Life simulator and ₹1,00,000 in simulated paper trading. Ten automated backend roles prepare work that requires human approval, and no real money is at risk.",
  },
  {
    q: "What is GetAITrade?",
    a: "GetAITrade is a trading tool that has been tested with real funds. It can prepare an order from instructions sent on the web or Telegram, but a person must confirm before anything executes. It is not a signal service and it does not manage money.",
  },
  {
    q: "What is Markets, Explained?",
    a: "A written series where I take one thing that happened in the market and explain the mechanism behind it in plain language: why capital rotated, what a company's balance sheet is really doing, why a price moved in the direction nobody expected. It is explanation after the fact, not prediction, and never a buy call.",
  },
  {
    q: "How do I get started working with you?",
    a: "Send the form on the Work with me page, or email me directly at shahaarit2@gmail.com. I read everything and reply within 24 hours, usually faster. If there's a fit, the next step is a free 30-minute call, and after that a written proposal with fixed scope so you know what you're getting before anything starts.",
  },
  {
    q: "Do you speak at events or run sessions?",
    a: "Yes. I've run seven webinars so far on software, trading and market basics, mostly for my own community. If you want a session for your community, company or campus, use the enquiry form.",
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
    title: "Inside MarketPlay's backend: 10 automated roles, one approval gate",
    dek: "How ten task-specific tools help run MarketPlay while every action still requires human approval.",
    category: "Product systems",
    date: "2026-07-20",
    readTime: "5 min read",
    body: [
      "MarketPlay is a financial literacy game with ten task-specific tools working behind the scenes. They draft scenario copy, grade checkpoint tests, watch the paper-trading broker and flag unusual activity in the six-tab analytics dashboard. None of them can publish a change or take an action until I approve it.",
      "I chose that structure because MarketPlay deals with a teenager's financial decisions, even when the money is simulated. An unreviewed mistake matters more here than it would in a typical side project. The tools handle repetitive work, but I remain responsible for anything that reaches a user.",
      "Each tool has one narrow job. One drafts the next scenario in the reel curriculum. Another watches the paper-trading order flow for possible problems with fills or settlement. A narrow role is easier to review and easier to fix when something goes wrong.",
      "GetAITrade follows the same rule with real trading. Software can connect to the broker, read a Telegram instruction and prepare an order, but a person must confirm before it executes. That approval step is the reason I'm comfortable using automation near anyone's money.",
      "I designed and built every part of MarketPlay's control room myself. The main lesson is simple: decide what automated software must never be allowed to do before deciding what it can do.",
    ],
  },
  {
    slug: "why-i-built-an-ai-trade-journal",
    title: "Why I built my own AI trade journal instead of paying for Tradezella",
    dek: "Send a screenshot and get a complete trade entry without filling in a form or paying a monthly subscription.",
    category: "Trading tools",
    date: "2026-07-13",
    readTime: "4 min read",
    body: [
      "Traders know they should record every trade, but manual entry is slow and easy to skip when the market is moving. I skipped it often enough that I built a tool for myself.",
      "The AI Trade Journal starts with one screenshot. Send a trade confirmation to its Telegram bot and the software extracts the entry, exit, size and instrument, then records the trade. There are no forms to fill in by hand.",
      "The dashboard covers the figures I wanted from Tradezella: net P&L, win rate, profit factor, average R, an equity curve and a full P&L calendar. It is free for me to run and stays focused on one job.",
      "It's live at ai-trade-journal-delta.vercel.app. Like most of my side projects, it began with a tool I wanted but couldn't find in the form I needed. I built it over a weekend and kept using it because it solved the problem.",
    ],
  },
  {
    slug: "teaching-1500-people-ai-and-trading",
    title: "What I teach in daily webinars to 1,500 people",
    dek: "No tips or signals. I explain markets and show the tools I use in my own work.",
    category: "Teaching",
    date: "2026-06-29",
    readTime: "4 min read",
    body: [
      "I run daily webinars on software, markets and trading for a community of more than 1,500 people. I'm not SEBI registered, and every session starts with the same boundary: I don't give tips or signals. I show how I think through a decision so people can learn to make their own.",
      "The software sessions use things I've built myself. I show how MarketPlay divides work into narrow roles, how the AI Trade Journal turns a screenshot into a trade entry and how GetAITrade requires a person to confirm every order.",
      "The markets half is value investing and systematic crypto trading, the same two disciplines I run my own capital through: screen for mispriced businesses, tear apart the financials before committing a rupee, demand a real moat, then manage the position as price moves. On the crypto side it's rules-based entries and exits with risk capped per trade, never a single bet on a single idea.",
      "I also use a repeatable process to turn daily notes into scripts and posts. It supported 4 million views in the last 90 days and helps me teach consistently, even on an ordinary day.",
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
    name: "Obsidian research library",
    category: "Knowledge",
    desc: "An Obsidian setup that collects reels, LinkedIn posts and podcasts, organises them into linked notes, reviews the notes each night and uses active-recall questions to check what I remember.",
  },
  {
    name: "AI Trade Journal",
    category: "Trading",
    desc: "Send one screenshot to a Telegram bot and it records the trade without manual entry. The dashboard shows net P&L, win rate, profit factor, average R, an equity curve and a full P&L calendar.",
    href: "https://ai-trade-journal-delta.vercel.app",
  },
  {
    name: "Research tools",
    category: "Automation",
    desc: "Tools that screen, summarise and flag equity and crypto research so I can review the relevant information myself.",
  },
  {
    name: "Financial models & research",
    category: "Investing",
    desc: "Valuation and DCF models I use to study a business before committing money, along with research tools I couldn't find elsewhere.",
  },
  {
    name: "The content workflow",
    category: "Growth",
    desc: "A repeatable process that turns my daily notes into scripts and posts. It supported 4M views in 90 days.",
  },
  {
    name: "Weekend experiments",
    category: "Everything else",
    desc: "Internal tools, dashboards and small weekend projects I build to test an idea, most of which I never publish.",
  },
];

export const forFun = [
  {
    name: "Productivity websites",
    category: "For fun",
    desc: "I build small productivity tools and websites because I enjoy solving problems I run into myself.",
  },
  {
    name: "Learning AI",
    category: "For fun",
    desc: "I study how current software models and automation tools work, then use what I learn in my own projects.",
  },
  {
    name: "Podcasts & deep dives",
    category: "For fun",
    desc: "I listen to podcasts and long-form discussions about markets, building and how people think.",
  },
  {
    name: "Following new questions",
    category: "For fun",
    desc: "I like learning for its own sake and usually find a new subject to follow each week.",
  },
];

export const newsletter = {
  title: "I write a newsletter, too.",
  desc: "I write about markets, building and whatever I've been studying. No tips or signals, just the reasoning behind my decisions.",
  cta: "Subscribe on LinkedIn",
  href: "https://www.linkedin.com/newsletters/youth-market-insights-7406681601700614144/",
};

export const investing = {
  intro:
    "I invest only after I understand what I'm holding. For equities, I use a value-investing approach. For crypto, I follow a written set of rules. In both cases, I decide the risk before entering a position.",
  equity: {
    label: "Equity Â· value investing",
    title: "Price, financials and competitive advantage.",
    intro:
      "I look for businesses trading below what I believe they are worth. Before investing, I review the financial statements and the company's competitive advantage. I then adjust the position as the price changes.",
    process: [
      {
        step: "01",
        title: "Look for a valuation gap",
        desc: "Screen for businesses where the market price appears lower than the underlying value.",
      },
      {
        step: "02",
        title: "Review the financials",
        desc: "Study the balance sheet, cash flows, margins and debt before taking a position.",
      },
      {
        step: "03",
        title: "Check the advantage",
        desc: "Look for a durable advantage such as pricing power, network effects, brand strength or lower costs.",
      },
      {
        step: "04",
        title: "Adjust the position",
        desc: "Reduce or add to a position as the price changes while keeping the original risk limits in view.",
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
    title: "Written rules and a fixed risk limit.",
    intro:
      "Alongside equities, I trade crypto CFDs using several strategies. The mix changes with the market, but I follow the same risk rules for every trade.",
    points: [
      "Entries and exits follow written rules rather than impulse.",
      "I size every position in advance and cap the risk on each trade.",
      "I use leverage cautiously and account for the added risk.",
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
      "MarketPlay is a financial literacy game available on the web and Google Play and used by more than 800 people. Each scenario begins with a real market event and asks you to choose Defensive, Balanced or Bold. A six-part result then shows how that choice affected your net worth. The product also includes 290+ short lessons across Money Basics and Stock Market, more than 30 interactive calculator chapters, a 32-decision Life simulator and ₹1,00,000 in simulated paper trading with order validation, fills, settlement and live P&L. A six-tab dashboard lets me review the product and approve work prepared by ten task-specific backend tools. I designed and built every part myself.",
    features: [
      { title: "Market scenarios", desc: "Fullscreen market events, one irreversible choice and a six-part explanation of the result." },
      { title: "290+ short lessons", desc: "Vertical lessons across Money Basics and Stock Market, with checkpoint tests between modules." },
      { title: "30+ interactive calculators", desc: "Slider-based chapters on FDs, tax, RSI, MACD, Bollinger Bands and Fibonacci, with purpose-built visualisations." },
      { title: "32-decision Life simulator", desc: "Moves through financial life stages across 32 decisions and charts how net worth changes over time." },
      { title: "Paper trading", desc: "₹1,00,000 in simulated money with order validation, fills, settlement, positions and day P&L, without a brokerage account or KYC." },
      { title: "Review dashboard", desc: "A six-tab dashboard for product analytics and approving work prepared by ten task-specific backend tools." },
    ],
    breakdown: {
      problem:
        "Financial literacy content for Indian teenagers is either a textbook or a finfluencer telling them what to buy. Both fail for the same reason: neither lets you be wrong cheaply. Nobody learns what risk feels like by reading a definition of it, and nobody should learn it with real money at eighteen.",
      approach:
        "Make each decision irreversible and show the consequence clearly. A real market event appears fullscreen, you choose Defensive, Balanced or Bold, and you cannot undo it. A six-part explanation then shows what that decision did to your net worth. The curriculum explains the concept, the calculators show the maths, paper trading lets you practise the mechanics, and the life simulator follows the effects over several decades.",
      architecture: [
        {
          label: "Scenario system",
          detail:
            "Real market events modelled as branching decisions with a scored outcome, explained in six parts rather than shown as a single result screen.",
        },
        {
          label: "21-module reel curriculum",
          detail:
            "Vertical lessons across Money Basics and Stock Market, with checkpoint tests that must be completed before the next module opens.",
        },
        {
          label: "30+ calculator chapters",
          detail:
            "FDs, tax, RSI, MACD, Bollinger Bands and Fibonacci, each explained through a slider-based visualisation rather than a static form.",
        },
        {
          label: "Simulated broker",
          detail:
            "Order validation, fills, settlement, positions and day P&L, modelled closely enough to teach the mechanics that matter on a real broker.",
        },
        {
          label: "Ten automated roles",
          detail:
            "Ten task-specific tools prepare operational work, with human approval required for every action.",
        },
        {
          label: "Review dashboard",
          detail:
            "A six-tab analytics dashboard for reviewing the product and supervising the automated work.",
        },
      ],
      decisions: [
        {
          call: "Every automated action needs human approval",
          why: "Software that can act without review is too risky for a product aimed at teenagers. Requiring approval makes the work slower, but keeps a person accountable.",
        },
        {
          call: "One irreversible decision per scenario, no undo",
          why: "An undo button would remove the consequence the lesson is meant to teach.",
        },
        {
          call: "Built the calculators rather than embedding existing ones",
          why: "Existing calculators were mostly forms. I wanted learners to see the curve change as they moved a slider, which required a custom visualisation.",
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
      "GetAITrade lets you prepare broker orders from the web or Telegram. It records each step and requires a person to confirm every order before execution. Phase one is live and has been tested with real funds.",
    features: [
      { title: "Broker connectivity", desc: "Connect a broker and turn an instruction into a structured order for review." },
      { title: "Confirmation before execution", desc: "A person must approve every live order before it is sent." },
      { title: "Complete audit log", desc: "Every step is recorded, and dry run is the default setting." },
    ],
    breakdown: {
      problem:
        "Software can turn a written instruction into a broker order, but it can also misunderstand that instruction. A useful trading tool has to account for the mistake that happens when real money is involved.",
      approach:
        "Let the software prepare an order, but never submit it on its own. Each instruction becomes a structured order that a person can read before it reaches the broker. Every live order pauses for confirmation, and dry run is the default setting.",
      architecture: [
        {
          label: "Structured orders",
          detail:
            "A written instruction becomes a structured order before anything reaches the broker API, so the person approving it can see exactly what will be sent.",
        },
        {
          label: "Confirmation step",
          detail:
            "Every live order requires explicit consent. The software can prepare and explain the order, but cannot submit it.",
        },
        {
          label: "Web and Telegram surfaces",
          detail:
            "Both use the same order process so the confirmation step is identical wherever the instruction begins.",
        },
        {
          label: "Audit logging",
          detail:
            "Every action is recorded, with dry run enabled by default so nothing executes silently.",
        },
      ],
      decisions: [
        {
          call: "No autonomous execution, at any tier",
          why: "Autonomous execution would change the nature and risk of the product. Because I am not SEBI registered, that boundary is firm.",
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
      "10x Founders is an invite-only group for young Mumbai founders. It focuses on considered introductions and small in-person gatherings rather than broad networking events or pitch sessions.",
    features: [
      { title: "Invite-only", desc: "A selected group of founders, operators and leaders under 25." },
      { title: "Considered introductions", desc: "Introductions are made when there is a clear reason for two people to meet." },
      { title: "In-person gatherings", desc: "Small gatherings held in places such as Colaba and Alibaug." },
    ],
  },
};
