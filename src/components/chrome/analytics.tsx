import Script from "next/script";

/**
 * Optional, cookie-free analytics. Nothing loads unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (e.g. to the production hostname).
 * NEXT_PUBLIC_PLAUSIBLE_SRC can point at a self-hosted Plausible instance.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
