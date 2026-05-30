import { useEffect, useRef, useState } from "react";
import ahmed from "@/assets/ahmed.png";
import CursorField from "@/components/CursorField";
import Spotlight from "@/components/Spotlight";
import { Decrypt } from "@/components/Decrypt";

const EMAIL = "ahmedsamyaminhamed@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/ahmedsamyamin/";
const GITHUB = "https://github.com/thoristo154";
const CV_FILE = "/Ahmed_Samy_CV.pdf";
const PHONE = "+201124890707";

type ExperienceEntry = {
  t: string;
  role: string;
  org: string;
  location?: string;
  bullets: string[];
  tags?: string[];
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    t: "May 2026 — Present",
    role: "Security Researcher",
    org: "RootX · Part-time",
    location: "Egypt · Remote",
    bullets: [
      "Conducting offensive security research and penetration testing engagements.",
      "Focused on web/API vulnerability discovery, exploit development, and clear technical reporting.",
    ],
    tags: ["Pentesting", "Cybersecurity", "Web", "API"],
  },
  {
    t: "Sep 2025 — Present",
    role: "Cybersecurity Head",
    org: "GDG On Campus · Future Academy",
    location: "Cairo, Egypt",
    bullets: [
      "Led the cybersecurity track, training 50+ students through workshops and live demos.",
      "Designed hands-on sessions on networking, vulnerabilities, OSINT, and secure coding.",
      "Integrated AI tooling to help students understand threats and automate analysis.",
      "Collaborated with technical teams to enforce security practices across events and projects.",
    ],
    tags: ["Leadership", "OSINT", "Training"],
  },
  {
    t: "Jul 2025 — Present",
    role: "Cyber Security Trainee",
    org: "Digital Egypt Pioneers Initiative (DEPI) · Internship",
    location: "Alexandria, Egypt · Remote",
    bullets: [
      "Structured training in network fundamentals, Linux, vulnerability assessment, and pentesting.",
      "Performed lab-based exercises simulating real-world attacks and defenses.",
      "Leveraged AI tools to document findings and reinforce key concepts.",
    ],
    tags: ["Nikto", "VAPT", "Linux", "Networking"],
  },
  {
    t: "Nov 2025 — Feb 2026",
    role: "Cyber Security Trainee",
    org: "Cyberthos · Internship",
    bullets: [
      "Assisted in vulnerability assessment and penetration testing tasks under supervision.",
      "Practiced network scanning, enumeration, and exploitation with Nmap, Burp Suite, Metasploit.",
      "Used AI-powered assistants to accelerate research and document findings ethically.",
      "Hands-on labs across reconnaissance, OSINT, and basic exploitation.",
    ],
    tags: ["Nmap", "Burp Suite", "Metasploit"],
  },
];

const EDUCATION = [
  {
    t: "Expected May 2026",
    role: "B.Sc. Computer Science & Engineering",
    org: "Future Academy, Egypt",
    bullets: ["eJPTv2 preparation running in parallel with degree coursework."],
  },
];

const CERTS = [
  { y: "2026", n: "Penetration Testing Student (eJPTv2 Prep)" },
  { y: "2025", n: "Infrastructure & Security VAPT — DEPI" },
  { y: "2025", n: "HCIA-Datacom V1.0" },
  { y: "2025", n: "Computer Network Fundamentals" },
  { y: "2023", n: "Front-End Web Development" },
  { y: "2023", n: "SQL Fundamentals" },
];

const LABS = [
  { p: "TryHackMe", d: "Top 15% globally · 41 rooms (Web · Nmap · Linux)" },
  {
    p: "PortSwigger Academy",
    d: "60+ labs solved (SQLi · XSS · IDOR · Path Traversal · Auth Bypass)",
  },
  { p: "HackTheBox", d: "Hands-on CTF practice · real-world exploitation techniques" },
  { p: "ECPC", d: "Egyptian Collegiate Programming Contest · Participant 2023 & 2024" },
];

const SERVICES = [
  {
    icon: "◈",
    title: "Web App Penetration Testing",
    body: "End-to-end testing of web apps against OWASP Top 10 — SQLi, XSS, IDOR, SSRF, auth flaws.",
  },
  {
    icon: "⟁",
    title: "API Security Assessment",
    body: "REST & GraphQL audits — broken auth, BOLA, mass assignment, rate-limit bypass, business-logic abuse.",
  },
  {
    icon: "⌖",
    title: "Reconnaissance & Attack Surface Mapping",
    body: "Subdomain enumeration, asset discovery, and exposure mapping with Subfinder, Amass, Httpx, Nuclei.",
  },
  {
    icon: "⌬",
    title: "Vulnerability Assessment (VAPT)",
    body: "Structured VAPT engagements with prioritized findings, proof-of-concept, and remediation steps.",
  },
  {
    icon: "⌁",
    title: "Security Awareness & Training",
    body: "Hands-on workshops on secure coding, OSINT, phishing defense, and threat modeling for teams.",
  },
];

const SKILLS = [
  { k: "OWASP", v: ["IDOR", "SQLi", "XSS", "CSRF", "SSRF", "BAC", "Logic Flaws"] },
  { k: "Recon", v: ["Subfinder", "Amass", "Httpx", "FFUF", "Nuclei"] },
  { k: "Tools", v: ["Burp Suite", "Nmap", "Metasploit", "Wireshark", "ZAP"] },
  { k: "Code", v: ["Python", "C++", "JavaScript", "Dart", "Bash"] },
];

const PROJECTS = [
  {
    id: "CVE-AUTH-001",
    title: "Authorization & Entitlement Bypass",
    target: "HackerOne Program",
    severity: "HIGH",
    status: "TRIAGED",
    tags: ["Privilege Escalation", "API", "BAC"],
    body: "Server-side authorization flaw — Free-tier accounts able to invoke premium scanning & secrets endpoints via crafted API requests. Verified end-to-end with full request/response chain.",
    link: GITHUB,
  },
  {
    id: "TOOL-RECON-V2",
    title: "recony-v2 · Recon Automation",
    target: "Open Source · Python",
    severity: "TOOLING",
    status: "SHIPPED",
    tags: ["Subfinder", "Amass", "Httpx", "Pipeline"],
    body: "Automated subdomain enumeration + HTTP probing pipeline. Chains Subfinder/Amass/Httpx into a scalable recon engine — cuts manual recon time by ~60%.",
    link: GITHUB,
  },
  {
    id: "LAB-PSWIGGER",
    title: "PortSwigger · 60+ Labs",
    target: "Apprentice → Practitioner",
    severity: "PRACTICE",
    status: "ACTIVE",
    tags: ["SQLi", "XSS", "IDOR", "Auth Bypass", "Path Traversal"],
    body: "Sixty plus PortSwigger Web Security labs solved across injection, access control, and authentication categories.",
    link: "https://portswigger.net/users/00s7Q4cikC",
  },
  {
    id: "RANK-THM",
    title: "TryHackMe · Top 15% Global",
    target: "41 Rooms Completed",
    severity: "ACHIEVEMENT",
    status: "LIVE",
    tags: ["Web", "Nmap", "Linux", "CTF"],
    body: "Sustained top-15% global ranking. Focus on web fundamentals, network mapping, and Linux post-exploitation.",
    link: "https://tryhackme.com/",
  },
];

function SeverityChip({ s }: { s: string }) {
  const map: Record<string, string> = {
    HIGH: "text-danger border-danger/50 bg-danger/10",
    TOOLING: "text-accent border-accent/50 bg-accent/10",
    PRACTICE: "text-warn border-warn/50 bg-warn/10",
    ACHIEVEMENT: "text-primary border-primary/50 bg-primary/10",
  };
  return (
    <span
      className={`rounded border px-1.5 py-0.5 text-[10px] tracking-widest ${map[s] ?? "text-foreground border-border"}`}
    >
      {s}
    </span>
  );
}

function Terminal() {
  const lines = [
    { p: "ahmed@kali:~$", c: "whoami" },
    { p: "", c: "→ junior penetration tester · bug bounty hunter · Alexandria, EG", muted: true },
    { p: "ahmed@kali:~$", c: "cat ./mission.txt" },
    {
      p: "",
      c: "→ break it before someone else does. report it. fix the world a little.",
      muted: true,
    },
    { p: "ahmed@kali:~$", c: "nmap -sV target.portfolio" },
    { p: "", c: "→ scroll to enumerate ↓", muted: true },
  ];
  const [shown, setShown] = useState<number>(0);
  useEffect(() => {
    const id = setInterval(() => setShown((s) => (s < lines.length ? s + 1 : s)), 380);
    return () => clearInterval(id);
  }, [lines.length]);
  return (
    <div className="relative rounded-lg border border-border bg-black/60 p-4 font-mono text-sm shadow-[0_0_60px_-20px_oklch(0.75_0.22_300/0.4)]">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-3 text-[10px] tracking-widest text-muted-foreground">
          /dev/ahmed — zsh
        </span>
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} className="leading-relaxed">
          {l.p && <span className="text-primary">{l.p}</span>}{" "}
          <span className={l.muted ? "text-muted-foreground" : "text-foreground"}>{l.c}</span>
        </div>
      ))}
      {shown >= lines.length && (
        <span className="inline-block h-4 w-2 translate-y-0.5 bg-primary animate-blink" />
      )}
    </div>
  );
}

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      <CursorField />

      {/* TOP BAR */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-xs tracking-widest">
        <div className="flex items-center gap-2 text-primary">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
          <span>SECURE_CHANNEL · 0x01</span>
        </div>
        <div className="hidden gap-6 text-muted-foreground md:flex">
          <a href="#arsenal" className="hover:text-primary">
            /arsenal
          </a>
          <a href="#services" className="hover:text-primary">
            /services
          </a>
          <a href="#engagements" className="hover:text-primary">
            /engagements
          </a>
          <a href="#timeline" className="hover:text-primary">
            /timeline
          </a>
          <a href="#credentials" className="hover:text-primary">
            /credentials
          </a>
          <a href="#contact" className="hover:text-primary">
            /contact
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded border border-border bg-surface/60 px-3 py-1.5 text-muted-foreground transition hover:border-accent hover:text-accent md:inline-block"
          >
            git/
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded border border-border bg-surface/60 px-3 py-1.5 text-muted-foreground transition hover:border-accent hover:text-accent md:inline-block"
          >
            in/
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded border border-primary/50 bg-primary/10 px-3 py-1.5 text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            ./contact.sh
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pt-10 pb-24 md:grid-cols-[1.2fr_1fr] md:items-center"
      >
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] tracking-widest text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            STATUS: HUNTING · TRIAGE PENDING (H1)
          </div>
          <h1
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl"
            style={{ fontFamily: "Space Grotesk, system-ui" }}
          >
            <Decrypt text="AHMED SAMY" className="text-glow text-primary" />
            <br />
            <span className="text-foreground/90">breaks things,</span>
            <br />
            <span className="text-accent text-glow-cyan">on purpose.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Junior penetration tester & bug bounty hunter. I live inside Burp, write Python at 2am,
            and turn business logic into permission slips. Based in Alexandria, EG — operating
            globally.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="group relative overflow-hidden rounded border border-primary bg-primary px-5 py-3 text-sm font-semibold tracking-wider text-primary-foreground transition hover:shadow-[0_0_30px_oklch(0.75_0.22_300/0.6)]"
            >
              <span className="relative z-10">→ INITIATE CONTACT</span>
            </a>
            <a
              href="/cv"
              target="_blank"
              rel="noreferrer"
              className="rounded border border-accent/60 bg-accent/10 px-5 py-3 text-sm tracking-wider text-accent transition hover:bg-accent hover:text-background"
            >
              ◉ view_cv
            </a>
            <a
              href={CV_FILE}
              download="Ahmed_Samy_CV.pdf"
              className="rounded border border-border bg-surface/50 px-5 py-3 text-sm tracking-wider text-foreground transition hover:border-primary hover:text-primary"
            >
              ⬇ download_cv.pdf
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border bg-surface/50 px-5 py-3 text-sm tracking-wider text-foreground transition hover:border-accent hover:text-accent"
            >
              linkedin://ahmedsamyamin
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border bg-surface/50 px-5 py-3 text-sm tracking-wider text-foreground transition hover:border-accent hover:text-accent"
            >
              github://thoristo154
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
            {[
              { n: "60+", l: "Labs Solved" },
              { n: "15%", l: "THM Global" },
              { n: "1", l: "H1 Triage" },
            ].map((s) => (
              <div key={s.l} className="rounded border border-border bg-surface/40 p-3">
                <div className="font-display text-2xl font-bold text-primary text-glow">{s.n}</div>
                <div className="mt-1 text-[10px] tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PORTRAIT — targeting reticle */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="relative aspect-square"
            style={{
              transform: `perspective(900px) rotateY(${parallax.x * 6}deg) rotateX(${-parallax.y * 6}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* rotating reticle */}
            <svg
              className="absolute inset-0 h-full w-full animate-spin [animation-duration:24s]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="96"
                stroke="oklch(0.75 0.22 300 / 0.35)"
                strokeDasharray="4 6"
              />
              <circle
                cx="100"
                cy="100"
                r="82"
                stroke="oklch(0.72 0.18 270 / 0.25)"
                strokeDasharray="2 10"
              />
            </svg>
            <svg
              className="absolute inset-0 h-full w-full animate-spin [animation-duration:40s] [animation-direction:reverse]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <path
                d="M100 4 V20 M100 180 V196 M4 100 H20 M180 100 H196"
                stroke="oklch(0.75 0.22 300 / 0.7)"
                strokeWidth="1.5"
              />
            </svg>
            {/* corners */}
            {[
              "top-2 left-2 border-t-2 border-l-2",
              "top-2 right-2 border-t-2 border-r-2",
              "bottom-2 left-2 border-b-2 border-l-2",
              "bottom-2 right-2 border-b-2 border-r-2",
            ].map((c) => (
              <span key={c} className={`absolute h-6 w-6 border-primary ${c}`} />
            ))}
            {/* image */}
            <div className="absolute inset-6 overflow-hidden rounded-full border border-primary/40 shadow-[0_0_60px_-10px_oklch(0.75_0.22_300/0.5)]">
              <img src={ahmed} alt="Ahmed Samy" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent 0, transparent 3px, oklch(0.75 0.22 300 / 0.06) 3px, oklch(0.75 0.22 300 / 0.06) 4px)",
                }}
              />
            </div>
            {/* label tag */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-primary/60 bg-background/90 px-3 py-1 text-[10px] tracking-widest text-primary">
              TARGET_LOCKED · ID:0xA5
            </div>
          </div>
        </div>
      </section>

      {/* TERMINAL + ARSENAL */}
      <section
        id="arsenal"
        className="relative z-10 mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2"
      >
        <Terminal />
        <Spotlight className="p-6">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight">// arsenal</h2>
            <span className="text-[10px] tracking-widest text-muted-foreground">
              LOADOUT v2026.1
            </span>
          </div>
          <div className="space-y-4">
            {SKILLS.map((s) => (
              <div key={s.k}>
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-xs tracking-widest text-accent">{s.k.padEnd(6, "·")}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.v.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border bg-background/60 px-2 py-1 text-xs text-foreground/90 transition hover:border-primary hover:text-primary hover:shadow-[0_0_12px_oklch(0.75_0.22_300/0.4)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Spotlight>
      </section>

      {/* ENGAGEMENTS — Projects as CVE/Bounty cards */}
      <section id="engagements" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-accent">// engagements.log</div>
            <h2 className="font-display mt-2 text-4xl font-bold tracking-tight">Field Reports</h2>
          </div>
          <div className="hidden text-right text-xs text-muted-foreground md:block">
            <div>
              FILTER: <span className="text-primary">ALL</span>
            </div>
            <div className="mt-1">{PROJECTS.length} records · disclosed</div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Spotlight key={p.id} className="group p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  REPORT_#{String(i + 1).padStart(3, "0")} · {p.id}
                </div>
                <SeverityChip s={p.severity} />
              </div>
              <h3 className="font-display mt-3 text-xl font-bold text-foreground transition group-hover:text-primary">
                {p.title}
              </h3>
              <div className="mt-1 text-xs text-accent">{p.target}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] tracking-wider text-foreground/80"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-[10px] tracking-widest text-muted-foreground">
                <span>
                  STATUS: <span className="text-primary">{p.status}</span>
                </span>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent opacity-80 transition hover:opacity-100"
                >
                  └─ view payload →
                </a>
              </div>
            </Spotlight>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-accent">// trace.route</div>
            <h2 className="font-display mt-2 text-4xl font-bold tracking-tight">
              Operations Timeline
            </h2>
          </div>
          <div className="hidden text-right text-xs text-muted-foreground md:block">
            uptime: <span className="text-primary">{EXPERIENCE.length}</span> nodes traced
          </div>
        </div>
        <ol className="relative space-y-10 border-l border-border pl-8">
          {EXPERIENCE.map((e, i) => (
            <li key={i} className="group relative">
              <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_currentColor] group-hover:animate-pulse" />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[11px] tracking-widest text-accent">{e.t}</span>
                {e.location && (
                  <span className="text-[10px] tracking-widest text-muted-foreground">
                    · {e.location}
                  </span>
                )}
              </div>
              <div className="font-display mt-1 text-lg font-semibold text-foreground">
                {e.role} <span className="text-muted-foreground">· {e.org}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {e.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {e.tags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border bg-surface/40 px-1.5 py-0.5 text-[10px] tracking-wider text-foreground/80"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* EDUCATION */}
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
            <div>
              <div className="text-[11px] tracking-[0.3em] text-accent">// boot.sequence</div>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight">Education</h2>
            </div>
          </div>
          <ol className="relative space-y-6 border-l border-border pl-8">
            {EDUCATION.map((e, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-accent bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                </span>
                <div className="text-[11px] tracking-widest text-accent">{e.t}</div>
                <div className="font-display mt-1 text-lg font-semibold text-foreground">
                  {e.role} <span className="text-muted-foreground">· {e.org}</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SERVICES — "What I Can Do For You" */}
      <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-accent">// services.exe</div>
            <h2 className="font-display mt-2 text-4xl font-bold tracking-tight">
              What I Can <span className="text-primary text-glow">Break</span> For You
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              As an offensive security operator, here's how I help teams ship safer systems — from a
              single endpoint to a full attack surface.
            </p>
          </div>
          <div className="hidden text-right text-xs text-muted-foreground md:block">
            {SERVICES.length} modules · armed
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Spotlight key={s.title} className="group p-6">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl text-primary text-glow transition group-hover:scale-110">
                  {s.icon}
                </span>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  SVC
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-foreground transition group-hover:text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Spotlight>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS + LABS */}
      <section id="credentials" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 border-b border-border pb-4">
          <div className="text-[11px] tracking-[0.3em] text-accent">// credentials.dump</div>
          <h2 className="font-display mt-2 text-4xl font-bold tracking-tight">
            Certifications & Labs
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Spotlight className="p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold">$ ls ./certs/</h3>
              <span className="text-[10px] tracking-widest text-muted-foreground">
                {CERTS.length} files
              </span>
            </div>
            <ul className="space-y-2 font-mono text-sm">
              {CERTS.map((c) => (
                <li
                  key={c.n}
                  className="group flex items-center gap-3 rounded border border-transparent px-2 py-1.5 transition hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="text-accent">[{c.y}]</span>
                  <span className="text-foreground/90 group-hover:text-primary">{c.n}</span>
                </li>
              ))}
            </ul>
          </Spotlight>
          <Spotlight className="p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold">$ ./labs --status</h3>
              <span className="text-[10px] tracking-widest text-muted-foreground">
                live training
              </span>
            </div>
            <ul className="space-y-3">
              {LABS.map((l) => (
                <li key={l.p} className="border-l-2 border-primary/60 pl-3">
                  <div className="font-display text-base font-semibold text-foreground">{l.p}</div>
                  <div className="text-xs text-muted-foreground">{l.d}</div>
                </li>
              ))}
            </ul>
          </Spotlight>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <Spotlight className="overflow-hidden p-10 md:p-16">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, oklch(0.75 0.22 300 / 0.2), transparent 60%)",
            }}
          />
          <div className="text-[11px] tracking-[0.3em] text-accent">// handshake.init</div>
          <h2 className="font-display mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Got a target?
            <br />
            <span className="text-primary text-glow">Let's break it together.</span>
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Open to bug bounty collaborations, junior pentester roles, and CTF squads. Encrypted
            preferred, plaintext accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="group relative overflow-hidden rounded border-2 border-primary px-6 py-4 font-mono text-sm tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <span className="relative z-10">&gt; {EMAIL}</span>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
            >
              linkedin.com/in/ahmedsamyamin
            </a>
            <a href="tel:+201124890707" className="text-sm text-muted-foreground hover:text-accent">
              +20 112 489 0707
            </a>
          </div>
        </Spotlight>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-[10px] tracking-widest text-muted-foreground md:flex-row">
          <span>© 2026 AHMED_SAMY · BUILT_FOR_BREAKING</span>
          <span>
            SESSION END — connection terminated{" "}
            <span className="text-primary animate-blink">_</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
