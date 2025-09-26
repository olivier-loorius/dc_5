import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Désactive tout composant client implicite dans MDX
    jsxImportSource: "react",
    providerImportSource: "@/mdx-components",
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // CONFIGURATION CRITIQUE pour réduire la mémoire
  experimental: {
    // Tree-shaking optimisé pour FontAwesome
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "lucide-react",
    ],
    // Désactiver les fonctionnalités lourdes en dev
    // serverComponentsExternalPackages déplacé vers serverExternalPackages
  },

  // Configuration moderne Next.js 15
  serverExternalPackages: ["@fortawesome/fontawesome-svg-core"],

  // Optimisation webpack CRITIQUE pour mémoire
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Réduire drastiquement l'utilisation mémoire
      config.optimization = {
        ...config.optimization,
        moduleIds: "named",
        chunkIds: "named",
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: -10,
              chunks: "all",
            },
            fontawesome: {
              test: /[\\/]node_modules[\\/]@fortawesome[\\/]/,
              name: "fontawesome",
              chunks: "all",
              priority: 10,
            },
          },
        },
      };

      // Limiter les workers et la mémoire
      config.parallelism = 1;
      config.cache = false; // Désactive le cache webpack en dev
    }

    return config;
  },

  // Optimisation des images légère
  images: {
    formats: ["image/webp"],
    dangerouslyAllowSVG: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
