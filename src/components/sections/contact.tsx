import { FileDown, Mail } from "lucide-react";
import { CopyEmail } from "@/components/visuals/copy-email";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Arrow, Container, ExternalArrow, buttonStyles } from "@/components/ui/primitives";
import { mailto, site } from "@/content/site";
import { cn, delay } from "@/lib/utils";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-line py-24 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[520px] bg-[radial-gradient(50%_60%_at_50%_100%,rgb(139_123_255/0.16),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_top,#000,transparent_70%)] opacity-60"
      />

      <Container>
        <div className="flex items-center gap-3" data-reveal="fade">
          <span className="label text-accent-bright">[09]</span>
          <span className="label">Contact</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="hidden label sm:inline">~/contact.sh</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <h2
              id="contact-title"
              data-reveal
              className="text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.045em] text-fg sm:text-6xl lg:text-7xl"
            >
              Have an interesting problem?
              <span className="mt-1 block text-gradient">Let&apos;s build it.</span>
            </h2>
            <p data-reveal style={delay(100)} className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
              I&apos;m most useful where backend, data and ML meet. Tell me what you&apos;re building.
            </p>

            <div data-reveal style={delay(160)} className="mt-10 flex flex-wrap items-center gap-2.5">
              <a href={mailto("Let's build something")} className={cn(buttonStyles.primary, "px-5")}>
                <Mail size={15} aria-hidden />
                Email me <Arrow />
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.secondary}
              >
                <LinkedInIcon size={15} /> LinkedIn <ExternalArrow className="text-subtle" />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.secondary}
              >
                <GitHubIcon size={15} /> GitHub <ExternalArrow className="text-subtle" />
              </a>
              <a href={site.resume} download="Manav-Punjabi-Resume.pdf" className={buttonStyles.secondary}>
                <FileDown size={15} aria-hidden /> Download resume
              </a>
            </div>
          </div>

          <div
            data-reveal
            style={delay(200)}
            className="overflow-hidden rounded-xl border border-line-strong bg-surface/80 font-mono text-[12px] leading-[1.8] backdrop-blur"
          >
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="ml-2 text-[11px] text-subtle">contact.sh</span>
            </div>
            <div className="p-5">
              <p className="text-fg">
                <span className="text-accent-bright">$</span> ping manav
              </p>
              <p className="text-muted">
                reply from <span className="text-fg">{site.email}</span>
              </p>
              <p className="text-muted">
                time=<span className="text-cyan">O(1)</span> status=
                <span className="text-ok">open to talk</span>
              </p>
              <div className="mt-4 border-t border-line pt-4">
                <CopyEmail />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
