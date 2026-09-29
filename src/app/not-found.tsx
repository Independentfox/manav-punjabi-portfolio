import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid min-h-dvh w-full max-w-[720px] content-center px-6">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.035em] text-fg">
        Nothing <span className="font-serif font-normal text-link italic">here</span>.
      </h1>
      <p className="mt-4 text-muted">The page moved, or never existed.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 w-fit items-center rounded-lg bg-peach px-4 text-sm font-medium text-peach-fg"
      >
        Back home
      </Link>
    </main>
  );
}
