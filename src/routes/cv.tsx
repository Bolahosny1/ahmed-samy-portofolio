import { useEffect } from "react";

const EMAIL = "ahmedsamyaminhamed@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/ahmedsamyamin/";

export default function CV() {
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("print") === "1") {
      setTimeout(() => window.print(), 400);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 print:bg-white">
      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="no-print sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-zinc-200 bg-white/95 px-6 py-3 backdrop-blur">
        <a href="/" className="text-sm font-semibold text-emerald-700 hover:underline">
          ← Back to portfolio
        </a>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="rounded border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            ⬇ Download PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-8 py-10 print:px-0 print:py-0">
        {/* Header */}
        <header className="border-b-2 border-zinc-900 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">AHMED SAMY</h1>
          <p className="mt-1 text-sm font-medium text-emerald-700">
            Junior Penetration Tester · Bug Bounty Hunter · Security Researcher
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            Alexandria, Egypt · +20 112 489 0707 ·{" "}
            <a href={`mailto:${EMAIL}`} className="text-emerald-700 underline">
              {EMAIL}
            </a>{" "}
            ·{" "}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 underline"
            >
              linkedin.com/in/ahmedsamyamin
            </a>
          </p>
        </header>

        {/* Summary */}
        <Section title="Professional Summary">
          <p className="text-sm leading-relaxed">
            Junior Penetration Tester and Bug Bounty Hunter with expertise in web application
            security, API testing, and vulnerability assessments. Skilled in identifying OWASP Top
            10 vulnerabilities, authorization flaws, and business logic errors. Adept at
            reconnaissance, exploitation, and delivering structured, actionable security reports.
          </p>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          {EXPERIENCE.map((e) => (
            <Entry
              key={e.role + e.org}
              date={e.t}
              title={e.role}
              org={e.org}
              location={e.location}
              bullets={e.bullets}
            />
          ))}
        </Section>

        {/* Education */}
        <Section title="Education">
          {EDUCATION.map((e) => (
            <Entry
              key={e.org}
              date={e.t}
              title={e.role}
              org={e.org}
              location={e.location}
              bullets={e.bullets}
            />
          ))}
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <ul className="space-y-1 text-sm">
            {CERTS.map((c) => (
              <li key={c.n} className="flex gap-3">
                <span className="font-mono text-emerald-700">{c.y}</span>
                <span>{c.n}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Skills */}
        <Section title="Technical Skills">
          <ul className="space-y-1.5 text-sm">
            {SKILLS.map((s) => (
              <li key={s.k}>
                <span className="font-semibold">{s.k}:</span>{" "}
                <span className="text-zinc-700">{s.v.join(" · ")}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Labs */}
        <Section title="Hands-on Training">
          <ul className="space-y-1.5 text-sm">
            {LABS.map((l) => (
              <li key={l.p}>
                <span className="font-semibold">{l.p}:</span>{" "}
                <span className="text-zinc-700">{l.d}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Competitions">
          <p className="text-sm">
            Egyptian Collegiate Programming Contest (ECPC) — Participant 2023 &amp; 2024
          </p>
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-3 border-b border-zinc-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({
  date,
  title,
  org,
  location,
  bullets,
}: {
  date: string;
  title: string;
  org: string;
  location?: string;
  bullets: string[];
}) {
  return (
    <div className="mb-4 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold">
          {title} · <span className="font-normal text-zinc-700">{org}</span>
        </h3>
        <span className="shrink-0 font-mono text-xs text-zinc-600">{date}</span>
      </div>
      {location && <div className="text-xs text-zinc-500">{location}</div>}
      <ul className="mt-1.5 list-disc pl-5 text-sm leading-relaxed text-zinc-700">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

const EXPERIENCE = [
  {
    t: "May 2026 — Present",
    role: "Security Researcher",
    org: "RootX (Part-time)",
    location: "Egypt · Remote",
    bullets: [
      "Conducting offensive security research and penetration testing engagements.",
      "Focused on web application & API security, vulnerability discovery, and exploit development.",
    ],
  },
  {
    t: "Sep 2025 — Present",
    role: "Cybersecurity Head",
    org: "GDG On Campus · Future Academy",
    location: "Cairo, Egypt",
    bullets: [
      "Led the cybersecurity track, training 50+ students through workshops and live demos.",
      "Designed hands-on sessions on networking, vulnerabilities, OSINT, and secure coding.",
      "Integrated AI tools to help students understand threats, automate analysis, and summarize complex topics.",
      "Collaborated with technical teams to ensure security practices across events and projects.",
    ],
  },
  {
    t: "Jul 2025 — Present",
    role: "Cyber Security Trainee",
    org: "Digital Egypt Pioneers Initiative (DEPI) · Internship",
    location: "Alexandria, Egypt · Remote",
    bullets: [
      "Completed structured training in network fundamentals, Linux, vulnerability assessment, and penetration testing.",
      "Performed lab-based exercises simulating real-world attacks and defenses.",
      "Leveraged AI tools to document findings, generate learning summaries, and reinforce key concepts.",
    ],
  },
  {
    t: "Jun 2025 — Present",
    role: "Game Tester — Beta Tester",
    org: "Dream Team Creative Collective · Freelance",
    location: "Remote",
    bullets: [
      "Tested Web3 and indie game UI/UX, identifying usability issues, design inconsistencies, and functional bugs.",
      "Documented issues using structured bug reports with reproducible steps, screenshots, and user-flow context.",
      "Collaborated with developers to improve gameplay through feedback on design, navigation, and interaction.",
      "Used AI-assisted tools to analyze bug report patterns and automate parts of test documentation.",
    ],
  },
  {
    t: "Nov 2025 — Feb 2026",
    role: "Cyber Security Trainee",
    org: "Cyberthos · Internship",
    bullets: [
      "Assisted in vulnerability assessment and penetration testing tasks under supervision.",
      "Practiced network scanning, enumeration, and exploitation using Nmap, Burp Suite, and Metasploit.",
      "Used AI-powered assistants to accelerate research, generate payloads ethically, and document findings.",
      "Participated in hands-on labs covering reconnaissance, OSINT, and basic exploitation.",
    ],
  },
  {
    t: "May 2025 — Jul 2025",
    role: "Official Game Night Host — Vexor",
    org: "Freelance",
    location: "Remote",
    bullets: [
      "Selected for the exclusive Vexor Founder Program — recognized for reputation and engagement.",
      "Hosted official Web3 Game Night events: match setups, player coordination, and event flow.",
      "Boosted community participation through fun, competitive, well-organized experiences.",
      "Earned event-revenue share via Vexor's host reward system.",
    ],
  },
  {
    t: "Apr 2024 — Mar 2025",
    role: "3D Visual Designer — Educational Projects",
    org: "ICPC Future Academy · Freelance",
    location: "Remote",
    bullets: [
      "Created 3D models and animations in Blender to support technical education.",
      "Designed visual learning assets for memory allocation, data structures, and algorithms.",
      "Used animations to simplify abstract computing topics for beginner students.",
    ],
  },
];

const EDUCATION = [
  {
    t: "Expected May 2026",
    role: "B.Sc. Computer Science & Engineering",
    org: "Future Academy",
    location: "Egypt",
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

const SKILLS = [
  {
    k: "OWASP Top 10",
    v: ["IDOR", "SQLi", "XSS", "CSRF", "SSRF", "Broken Access Control", "Logic Flaws"],
  },
  { k: "Reconnaissance", v: ["Subfinder", "Amass", "Httpx", "FFUF", "Nuclei"] },
  { k: "Tooling", v: ["Burp Suite", "Nmap", "Metasploit", "Wireshark", "OWASP ZAP", "Nikto"] },
  { k: "Programming", v: ["Python", "C++", "JavaScript", "Dart", "Bash"] },
];

const LABS = [
  { p: "TryHackMe", d: "Top 15% globally · 41 rooms (Web Fundamentals, Nmap Mastery, Linux)" },
  {
    p: "PortSwigger Academy",
    d: "60+ labs (Apprentice/Practitioner): SQLi, XSS, IDOR, Path Traversal, Auth Bypass",
  },
  { p: "HackTheBox", d: "Hands-on CTF practice — real-world exploitation techniques" },
];
