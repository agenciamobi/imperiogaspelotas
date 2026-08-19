import { useEffect } from "react";
import Header from "@/components/Header";
import ConversionHero from "@/components/ConversionHero";
import SocialProof from "@/components/SocialProof";
import ProductsGas from "@/components/ProductsGas";
import Differentials from "@/components/Differentials";
import HowItWorks from "@/components/HowItWorks";
import LocalCoverage from "@/components/LocalCoverage";
import GuidesTeaser from "@/components/GuidesTeaser";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { SITE_URL } from "@/lib/constants";

const HOME_TITLE = "Disk Gás e Água em Pelotas RS | Império Gás e Água";
const HOME_DESCRIPTION =
  "Peça gás de cozinha e água mineral em Pelotas pelo WhatsApp ou telefone. Consulte P13, P08, Liquinho 2kg e água 20L, com disponibilidade e prazo confirmados para seu endereço.";

const Index = () => {
  useEffect(() => {
    const url = `${SITE_URL}/`;
    document.title = HOME_TITLE;

    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

      if (!element) {
        if (selector.startsWith("link")) {
          element = document.createElement("link");
          (element as HTMLLinkElement).rel = "canonical";
        } else {
          element = document.createElement("meta");
          const match = selector.match(/\[(.+?)="(.+?)"\]/);
          if (match) (element as HTMLMetaElement).setAttribute(match[1], match[2]);
        }
        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", HOME_DESCRIPTION);
    setMeta('meta[name="robots"]', "content", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", HOME_TITLE);
    setMeta('meta[property="og:description"]', "content", HOME_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', "content", HOME_TITLE);
    setMeta('meta[name="twitter:description"]', "content", HOME_DESCRIPTION);
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
        <GuidesTeaser />
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
