import { ogAlt, ogSize, renderOgCard } from "./_og/og-card";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard();
}
