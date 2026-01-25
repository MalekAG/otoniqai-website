import { Header, Footer } from "@/components/layout";
import { Hero, Services, Process, Contact } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
