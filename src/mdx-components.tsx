import type { MDXComponents } from "mdx/types";

// Fournit les composants MDX sans passer par un Provider/context côté client
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

