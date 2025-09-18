import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalToc from "@/components/legal/LegalToc";
import Mentions from "@/content/legal/fr/mentions-legales.mdx";

describe("Pages légales (smoke)", () => {
  it("rend le layout avec le TOC et le contenu MDX", () => {
    const tocItems = [
      { slug: "mentions-legales", label: "Mentions légales" },
      { slug: "conditions-utilisation", label: "Conditions d’utilisation" },
      { slug: "confidentialite", label: "Politique de confidentialité" },
      { slug: "faq", label: "FAQ" },
    ];
    render(
      <LegalLayout
        title="Informations légales"
        subtitle="Test"
        toc={<LegalToc items={tocItems} basePath="/legal" />}
      >
        <Mentions />
      </LegalLayout>
    );
    expect(
      screen.getByRole("heading", { name: /Mentions légales/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/Vercel Inc\./i)).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /Pages légales/i })
    ).toBeInTheDocument();
  });
});

