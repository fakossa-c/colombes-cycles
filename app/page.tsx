import Hero from "@/components/home/Hero";
import TrustBand from "@/components/home/TrustBand";
import Services from "@/components/home/Services";
import RepairProcess from "@/components/home/RepairProcess";
import Boutique from "@/components/home/Boutique";
import Team from "@/components/home/Team";
import Reviews from "@/components/home/Reviews";
import CtaFinal from "@/components/home/CtaFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Services />
      <RepairProcess />
      <Boutique />
      <Team />
      <Reviews />
      <CtaFinal />
    </>
  );
}
