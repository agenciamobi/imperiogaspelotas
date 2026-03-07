import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsGas from "@/components/ProductsGas";
import ProductsWater from "@/components/ProductsWater";
import Differentials from "@/components/Differentials";
import HowItWorks from "@/components/HowItWorks";
import P13Usage from "@/components/P13Usage";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductsGas />
        <ProductsWater />
        <Differentials />
        <HowItWorks />
        <P13Usage />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Index;
