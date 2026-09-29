import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { PaletteHint } from "@/components/hero/palette-hint";
import { Container } from "@/components/ui/primitives";
import { mailto, site } from "@/content/site";

const links = [
  { label: "LinkedIn", href: site.links.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub", href: site.links.github, icon: GitHubIcon, external: true },
  { label: "Codeforces", href: site.links.codeforces, icon: CodeforcesIcon, external: true },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line py-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[15px] font-semibold tracking-tight text-fg">
              MANAV PUNJABI<span className="text-accent-bright">.</span>
            </p>
            <p className="mt-2 text-sm text-muted">Software Engineer · AI/ML · Systems</p>
          </div>

          <nav aria-label="Elsewhere">
            <ul className="flex flex-wrap items-center gap-2">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={mailto()}
                  className="flex min-h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Manav Punjabi · designed and engineered from scratch — no templates.
          </p>
          <p>
            Reaching me: <span className="text-muted">O(1)</span> · press <PaletteHint />
          </p>
        </div>
      </Container>
    </footer>
  );
}
