import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main id="main" className="relative z-[1] grid min-h-dvh place-items-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-radial" />
      <Container className="max-w-xl">
        <div className="overflow-hidden rounded-xl border border-line-strong bg-surface/80 font-mono text-[13px] leading-[1.8]">
          <div className="border-b border-line px-4 py-2.5 text-[11px] text-subtle">manav@iitr — zsh</div>
          <div className="p-5">
            <p className="text-fg">
              <span className="text-accent-bright">$</span> curl -I this-page
            </p>
            <p className="text-err">HTTP/2 404 — route not found</p>
            <p className="text-subtle">The page moved, or never existed. Either way, it isn&apos;t here.</p>
          </div>
        </div>
        <h1 className="mt-10 text-5xl font-semibold tracking-[-0.04em] text-fg">404.</h1>
        <p className="mt-3 text-muted">Nothing to see at this address.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-fg px-5 text-sm font-medium text-ink hover:bg-white"
        >
          Back to the system →
        </Link>
      </Container>
    </main>
  );
}
