import { ArrowUpRight, FileText, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { CodeforcesCard } from "@/components/site/codeforces-card";
import { CommandBar } from "@/components/site/command-bar";
import { ExperienceList } from "@/components/site/experience-list";
import { RotatingWords } from "@/components/site/rotating-words";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import {
  achievements,
  buildWords,
  education,
  experience,
  mailto,
  moreProjects,
  projects,
  site,
} from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { delay } from "@/lib/utils";

// Codeforces data is refreshed at most once a day.
export const revalidate = 86400;

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-0.5 inline-link"
    >
      {children}
      <ArrowUpRight size={14} aria-hidden className="translate-y-0.5" />
    </a>
  );
}

function B({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-fg">{children}</strong>;
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 eyebrow">
      {children}
    </h2>
  );
}

const socials = [
  { label: "GitHub", href: site.links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedInIcon },
  { label: "Codeforces", href: site.links.codeforces, Icon: CodeforcesIcon },
];

function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.fullName,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    description: site.description,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Roorkee" },
    knowsAbout: ["Backend engineering", "ML infrastructure", "Recommendation systems", "AI tooling"],
    sameAs: [site.links.linkedin, site.links.github, site.links.codeforces],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <main id="main" className="mx-auto w-full max-w-[720px] px-6 pt-16 pb-12 sm:pt-24">
        {/* Intro */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="enter-rise text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-fg sm:text-6xl">
              Hi, I&apos;m <span className="text-link">{site.firstName}</span>{" "}
              <span className="wave" role="img" aria-label="waving hand">
                👋
              </span>
            </h1>
            <p
              className="enter mt-3 text-[1.35rem] font-medium tracking-[-0.01em] text-muted sm:text-[1.7rem]"
              style={delay(80)}
            >
              &amp; I build <RotatingWords words={buildWords} />
            </p>
          </div>
          <div className="enter" style={delay(200)}>
            <ThemeToggle />
          </div>
        </header>

        <div className="enter mt-10 space-y-5 text-[16px] leading-[1.75] text-muted" style={delay(140)}>
          <p>
            I&apos;m a software engineer and an ECE undergrad at <B>IIT Roorkee</B>, working where backend
            systems, data and ML meet. I care about things that hold up in production, not just in a notebook.
          </p>
          <p>
            Most recently at <B>Glance · InMobi</B>, I built a recommendation pipeline serving{" "}
            <B>300M+ users</B> and shipped features across <B>9 production services</B> in 8 weeks. Before
            that, I built the Zudo app end-to-end at <B>Airblack</B> — its scheduling and payment modules
            handle <B>10k+ transactions a month</B>.
          </p>
          <p>
            On the side, I built a{" "}
            <Ext href="https://github.com/Independentfox/self-correcting-agent">
              self-correcting voice-agent tester
            </Ext>{" "}
            that took agent success from <B>17% to 100%</B>, and I&apos;m a <B>Candidate Master</B> on
            Codeforces. Type{" "}
            <code className="rounded-md border border-line bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
              /achievements
            </code>{" "}
            in the bar below to see more.
          </p>
          <p>
            The fastest way to reach me is <B>an email</B> :)
          </p>
        </div>

        <div className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(200)}>
          <a
            href={mailto("Hello from your portfolio")}
            className="group inline-flex h-10 items-center gap-2 rounded-lg bg-peach px-4 text-sm font-medium text-peach-fg shadow-[0_6px_20px_-8px_rgb(247_185_139/0.7)] transition-[transform,filter] hover:brightness-105 active:scale-[0.98]"
          >
            <Mail size={16} aria-hidden />
            Send an email
          </a>
          <a
            href={site.resume}
            download="Manav-Punjabi-Resume.pdf"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:bg-card active:scale-[0.98]"
          >
            <FileText size={16} aria-hidden />
            Resume
          </a>
        </div>

        <div className="enter mt-8" style={delay(260)}>
          <p className="text-sm text-muted">
            Find me on <span aria-hidden>→</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-tint-line bg-tint px-3 text-sm font-medium text-link transition-colors hover:bg-peach hover:text-peach-fg"
                >
                  <Icon size={15} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <CodeforcesCard />
        </div>

        {/* Experience */}
        <section aria-labelledby="experience" className="mt-16" data-reveal>
          <SectionTitle id="experience">Experience</SectionTitle>
          <ExperienceList roles={experience} />
        </section>

        {/* Projects */}
        <section aria-labelledby="projects" className="mt-14" data-reveal>
          <SectionTitle id="projects">Projects</SectionTitle>
          <ul className="divide-y divide-dashed divide-line-strong">
            {projects.map((p) => (
              <li key={p.name} className="py-5 first:pt-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[17px] font-medium text-fg">
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-1 transition-colors hover:text-link"
                      >
                        {p.name}
                        <ArrowUpRight
                          size={15}
                          aria-hidden
                          className="translate-y-0.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0 group-hover:text-link"
                        />
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <span className="text-sm text-subtle">{p.meta}</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-line p-5">
            <h3 className="text-sm text-muted">More on GitHub</h3>
            <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {moreProjects.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-[14.5px] leading-snug"
                  >
                    <span className="text-fg transition-colors group-hover:text-link">{p.name}</span>
                    <ArrowUpRight
                      size={13}
                      aria-hidden
                      className="ml-0.5 inline text-subtle group-hover:text-link"
                    />
                    <span className="block text-[13px] text-subtle">{p.blurb}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Education */}
        <section aria-labelledby="education" className="mt-14" data-reveal>
          <SectionTitle id="education">Education</SectionTitle>
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-card text-[13px] font-semibold text-fg"
            >
              IITR
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[17px] leading-tight font-medium text-fg">
                Indian Institute of Technology, Roorkee
              </p>
              <p className="mt-1 text-[15px] leading-tight text-muted">
                {education.degree} · {education.minor.replace("Minor in ", "Minor: ")}
              </p>
            </div>
            <span className="hidden shrink-0 text-sm text-fg/85 sm:block">{education.period}</span>
          </div>
        </section>

        {/* Achievements */}
        <section aria-labelledby="achievements" className="mt-14" data-reveal>
          <SectionTitle id="achievements">Achievements</SectionTitle>
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li
                key={a.what}
                className="grid grid-cols-[84px_1fr] gap-4 text-[15px] leading-snug sm:grid-cols-[96px_1fr]"
              >
                <span className="font-mono text-[14px] text-link">{a.mark}</span>
                <span className="text-fg">
                  {a.what} <span className="text-subtle">· {a.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-20 flex flex-col gap-2 border-t border-line pt-6 pb-36 text-sm text-subtle sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>
            Type <kbd className="rounded border border-line-strong px-1.5 font-mono text-xs">/</kbd> anywhere
            to explore
          </p>
        </footer>
      </main>

      <CommandBar />
    </>
  );
}
