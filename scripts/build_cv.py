"""Generate Aarit Shah's CV as a clean, ATS-friendly PDF -> public/aarit-shah-cv.pdf"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle

INK = HexColor("#16161a")
BODY = HexColor("#2c2c33")
GRAY = HexColor("#5d5d68")
AMBER = HexColor("#c2740a")

OUT = "public/aarit-shah-cv.pdf"
MARGIN = 1.5 * cm
CW = A4[0] - 2 * MARGIN


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ---- styles ----
name_st = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23,
                         textColor=INK, leading=25, spaceAfter=2)
title_st = ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=10.5,
                          textColor=AMBER, leading=14, spaceAfter=4)
contact_st = ParagraphStyle("contact", fontName="Helvetica", fontSize=8.6,
                            textColor=GRAY, leading=13)
reach_st = ParagraphStyle("reach", fontName="Helvetica", fontSize=9.5,
                          textColor=BODY, leading=14, spaceBefore=6)
sec_st = ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=11,
                        textColor=INK, leading=13, spaceBefore=4)
etitle_st = ParagraphStyle("etitle", fontName="Helvetica", fontSize=10.3,
                           textColor=INK, leading=13)
edates_st = ParagraphStyle("edates", fontName="Helvetica", fontSize=9,
                           textColor=GRAY, leading=13, alignment=TA_RIGHT)
body_st = ParagraphStyle("body", fontName="Helvetica", fontSize=9.2,
                         textColor=BODY, leading=11.6, spaceBefore=1.5)
bullet_st = ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.2,
                           textColor=BODY, leading=11.6, spaceBefore=1.5,
                           leftIndent=10, bulletIndent=0)
small_st = ParagraphStyle("small", fontName="Helvetica-Oblique", fontSize=7.8,
                          textColor=GRAY, leading=11, spaceBefore=6)


def section(title):
    return [
        Spacer(1, 2.5),
        Paragraph(title.upper(), sec_st),
        HRFlowable(width="100%", thickness=1.1, color=AMBER,
                   spaceBefore=2, spaceAfter=4),
    ]


def entry(role, org, dates, desc):
    left = Paragraph(f"<b>{esc(role)}</b>, {esc(org)}", etitle_st)
    right = Paragraph(esc(dates), edates_st)
    t = Table([[left, right]], colWidths=[CW * 0.74, CW * 0.26])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    flow = [t]
    if desc:
        flow.append(Paragraph(esc(desc), body_st))
    flow.append(Spacer(1, 3))
    return flow


def bullet(text):
    return Paragraph(esc(text), bullet_st, bulletText="•")


story = []

# ---- header ----
story.append(Paragraph("Aarit Shah", name_st))
story.append(Paragraph("Founder &nbsp;&middot;&nbsp; Trader &nbsp;&middot;&nbsp; Creator &nbsp;&middot;&nbsp; Student", title_st))
contact = " &nbsp;&middot;&nbsp; ".join([
    "South Bombay, India",
    "shahaarit2@gmail.com",
    "+91 98199 75062",
    "linkedin.com/in/aarit-shah-7a1a56395",
    "@withaarit",
    "aaritshahportfolio.online",
])
story.append(Paragraph(contact, contact_st))
story.append(HRFlowable(width="100%", thickness=1.1, color=AMBER, spaceBefore=8, spaceAfter=0))
reach = ("<font color='#c2740a'><b>2.7M</b></font> monthly views &nbsp;&nbsp;&nbsp; "
         "<font color='#c2740a'><b>23K</b></font> followers / 30 days &nbsp;&nbsp;&nbsp; "
         "<font color='#c2740a'><b>1,500+</b></font> community led")
story.append(Paragraph(reach, reach_st))

# ---- profile ----
story += section("Profile")
story.append(Paragraph(esc(
    "Founder, trader, creator and student from South Bombay. I build the things I "
    "can't buy, trade real markets daily, and document my journey to help others "
    "learn how to think, analyze and trade for themselves. Building MarketPlay, "
    "GetAITrade and 10x Founders, and leading a community of 1,500+. No tips, no "
    "signals, just the mechanics."), body_st))

# ---- experience ----
story += section("Experience")
for r, o, d, desc in [
    ("Founder & CEO", "MarketPlay", "Apr 2026 - Present",
     "Gamified financial literacy for the next generation: real-life financial "
     "scenarios as your age progresses, backed by short-form lessons and "
     "micro-learning. Designed, built and shipped the prototype end to end."),
    ("Founder", "GetAITrade", "2026 - Present",
     "Co-building AI trading-command infrastructure with my team: broker "
     "connectivity, Telegram routing, human-verified execution and full audit "
     "logging. Tested live with real funds."),
    ("Founder", "10x Founders", "Jun 2026 - Present",
     "An invite-only room for young Mumbai founders who are actually building. "
     "Curating the people, the introductions and the rooms."),
    ("Editor, Youth Market Insights", "Self-employed", "Nov 2025 - Jun 2026",
     "Breaking down markets, money and financial literacy for Gen Z in plain "
     "language."),
    ("AI Finance Intern", "Concept Investwell Pvt. Ltd.", "Mar 2026 - May 2026",
     "Built internal AI tools to automate workflows and improve operational "
     "efficiency for the investment team."),
]:
    story += entry(r, o, d, desc)

# ---- investing ----
story += section("Investing & Trading")
for b in [
    "Value investor: hunt genuinely undervalued businesses, tear apart their "
    "financials, demand a durable moat, then trim positions strategically as the "
    "price moves.",
    "Manage portfolios for three family members. Personal portfolio at roughly "
    "52% CAGR; family portfolios at 30-35% CAGR.",
    "Trade crypto CFDs with a systematic, multi-strategy, risk-first approach: "
    "rules-based entries and exits, every position pre-sized, leverage respected.",
]:
    story.append(bullet(b))

# ---- education ----
story += section("Education")
story += entry("KC College, Churchgate", "Commerce", "2025 - 2027", "")
story += entry(
    "MET Rishikul Vidyalaya", "Class X boards", "2011 - 2025",
    "90% across my top five subjects and 87% aggregate across all seven: Physics, "
    "Chemistry, Biology, Maths, Business Studies, English and Hindi.")

# ---- skills ----
story += section("Skills")
for group, items in [
    ("Markets & Trading", "Derivatives, Day trading, Crypto, Equity research, Technical analysis, Portfolio management"),
    ("AI & Automation", "AI agents, Trading bots, Research bots, Automation, Prompt engineering"),
    ("Building", "Web & app dev, Next.js, Full-stack, Rapid prototyping"),
    ("Content & Growth", "Short-form video, LinkedIn, Community, Newsletter, SEO"),
]:
    story.append(Paragraph(f"<b>{esc(group)}:</b> {esc(items)}", body_st))

# ---- certifications ----
story += section("Certifications")
for name, issuer, date in [
    ("Markets Quantitative Analysis (MQA)", "Citi (Forage)", "Mar 2026"),
    ("Quantitative Research", "J.P. Morgan (Forage)", "Dec 2025"),
    ("Investment Banking", "JPMorgan Chase (Forage)", "Dec 2025"),
    ("Risk", "Goldman Sachs (Forage)", "Jan 2026"),
    ("Trading in the Zone (Elementary)", "GetTogetherFinance", "Jan 2026"),
    ("Volunteer", "World Hindu Economic Forum", "Dec 2025"),
]:
    story.append(Paragraph(
        f"<b>{esc(name)}</b> &nbsp;&middot;&nbsp; {esc(issuer)} &nbsp;&middot;&nbsp; "
        f"<font color='#5d5d68'>{esc(date)}</font>", body_st))

story.append(Paragraph(
    "Personal track record, educational only. Not SEBI registered. "
    "No tips, calls or signals.", small_st))

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=1.1 * cm, bottomMargin=1.0 * cm,
    title="Aarit Shah - CV", author="Aarit Shah",
    subject="Curriculum Vitae",
)
doc.build(story)
print("Wrote", OUT)
