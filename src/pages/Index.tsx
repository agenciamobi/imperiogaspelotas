import { useEffect } from "react";
import Header from "@/components/Header";
import ConversionHero from "@/components/ConversionHero";
import SocialProof from "@/components/SocialProof";
import ProductsGas from "@/components/ProductsGas";
import Differentials from "@/components/Differentials";
import HowItWorks from "@/components/HowItWorks";
import LocalCoverage from "@/components/LocalCoverage";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";

const Index = () => {
  useEffect(() => {
    document.title = "Império Gás e Água – Disk Gás Pelotas RS | Entrega Rápida";
    const url = "https://imperiogaspelotas.com.br/";
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", url);
  }, []);

  return (
    <>
      <Header />
      <main>
        <ConversionHero />
        <SocialProof />
        <ProductsGas />
        <Differentials />
        <HowItWorks />
        <LocalCoverage />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </>
  );
};

export default Index;
