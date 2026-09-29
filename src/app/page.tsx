import { Navbar } from "@/components/chrome/navbar";
import { Hero } from "@/components/hero/hero";
import { Beyond } from "@/components/sections/beyond";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Method } from "@/components/sections/method";
import { Metrics } from "@/components/sections/metrics";
import { Projects } from "@/components/sections/projects";
import { Proof } from "@/components/sections/proof";
import { Range } from "@/components/sections/range";
import { Toolchain } from "@/components/sections/toolchain";
import { PersonJsonLd } from "@/components/seo/person-json-ld";

// Codeforces rating history is refreshed at most once a day.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Navbar />
      <main id="main" className="relative z-[1]">
        <Hero />
        <Metrics />
        <Experience />
        <Range />
        <Projects />
        <Method />
        <Beyond />
        <Proof />
        <Toolchain />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
