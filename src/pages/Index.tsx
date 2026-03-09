import Header from "@/components/Header";
import ConversionHero from "@/components/ConversionHero";
import SocialProof from "@/components/SocialProof";
import ProductsGas from "@/components/ProductsGas";
import Differentials from "@/components/Differentials";
import HowItWorks from "@/components/HowItWorks";
import Guarantees from "@/components/Guarantees";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <ConversionHero />
        <SocialProof />
        <ProductsGas />
        <Differentials />
        <HowItWorks />
        <Guarantees />
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
