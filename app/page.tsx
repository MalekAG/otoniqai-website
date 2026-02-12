import { Header, Footer } from "@/components/layout";
import { Hero, Services, Products, Process, Contact } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
