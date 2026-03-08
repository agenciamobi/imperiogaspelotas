import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import ProductsGas from "@/components/ProductsGas";
import ProductsWater from "@/components/ProductsWater";
import Differentials from "@/components/Differentials";
import HowItWorks from "@/components/HowItWorks";
import P13Usage from "@/components/P13Usage";
import CtaBanner from "@/components/CtaBanner";
import BlogPreview from "@/components/BlogPreview";
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
        <Hero />
        <QuickAccess />
        <ProductsGas />
        <ProductsWater />
        <Differentials />
        <HowItWorks />
        <P13Usage />
        <CtaBanner />
        <BlogPreview />
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
