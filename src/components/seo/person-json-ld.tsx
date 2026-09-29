import { education, site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export function PersonJsonLd() {
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
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      url: "https://www.iitr.ac.in",
    },
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    knowsAbout: [
      "Backend engineering",
      "Distributed systems",
      "ML infrastructure",
      "Recommendation systems",
      "AI tooling",
      "Competitive programming",
    ],
    sameAs: [site.links.linkedin, site.links.github, site.links.codeforces],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
