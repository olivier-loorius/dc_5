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
};

export default withNextIntl(withMDX(nextConfig));
