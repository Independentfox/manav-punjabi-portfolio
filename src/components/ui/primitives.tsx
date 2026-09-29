import type { ComponentProps, ReactNode } from "react";
import { cn, delay } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)} {...props} />;
}

type SectionProps = ComponentProps<"section"> & { id: string };

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative py-24 md:py-32", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  id,
  index,
  kicker,
  path,
  title,
  lede,
  className,
}: {
  id: string;
  index: string;
  kicker: string;
  path: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-3" data-reveal="fade">
        <span className="label text-accent-bright">[{index}]</span>
        <span className="label">{kicker}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span className="hidden label sm:inline">{path}</span>
      </div>
      <h2
        id={`${id}-title`}
        data-reveal
        style={delay(60)}
        className="mt-6 max-w-3xl text-[2.1rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-5xl md:text-[3.6rem]"
      >
        {title}
      </h2>
      {lede ? (
        <p
          data-reveal
          style={delay(120)}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[11px] leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const buttonBase =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]";

export const buttonStyles = {
  primary: cn(
    buttonBase,
    "bg-fg text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_8px_30px_-8px_rgb(139_123_255/0.55)] hover:bg-white",
  ),
  secondary: cn(
    buttonBase,
    "border border-line-strong bg-white/[0.02] text-fg hover:border-white/25 hover:bg-white/[0.06]",
  ),
  ghost: cn(buttonBase, "text-muted hover:bg-white/[0.05] hover:text-fg"),
};

/** Arrow that nudges forward on parent hover. */
export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5",
        className,
      )}
    >
      →
    </span>
  );
}

export function ExternalArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        className,
      )}
    >
      ↗
    </span>
  );
}
