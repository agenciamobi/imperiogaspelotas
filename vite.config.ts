import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const LEGACY_DOMAIN = "https://imperiogas.com.br";
const SITE_URL = "https://imperiogaspelotas.com.br";

function normalizeSeoDomain(value: string): string {
  return value.split(LEGACY_DOMAIN).join(SITE_URL);
}

function seoDomainNormalizer(): Plugin {
  return {
    name: "imperio-seo-domain-normalizer",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("/src/") || !code.includes(LEGACY_DOMAIN)) return null;

      return {
        code: normalizeSeoDomain(code),
        map: null,
      };
    },
    transformIndexHtml(html) {
      return normalizeSeoDomain(html)
        // Remove o LocalBusiness legado que continha endereço, coordenadas,
        // avaliações e reviews não validados como dados oficiais do negócio.
        .replace(/<!-- Schema: LocalBusiness -->[\s\S]*?(?=<!-- Schema: Organization -->)/, "")
        // Não publicar coordenadas aproximadas da cidade como se fossem da empresa.
        .replace(/\s*<meta name="geo\.position"[^>]*>\s*/g, "\n")
        .replace(/\s*<meta name="ICBM"[^>]*>\s*/g, "\n");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [seoDomainNormalizer(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
