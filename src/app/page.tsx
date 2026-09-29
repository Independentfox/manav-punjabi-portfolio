import { Navbar } from "@/components/chrome/navbar";
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}
