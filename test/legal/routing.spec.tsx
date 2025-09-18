import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import LegalLayout from "@/components/legal/LegalLayout";
import LegalToc from "@/components/legal/LegalToc";
import Mentions from "@/content/legal/fr/mentions-legales.mdx";
import Conditions from "@/content/legal/fr/conditions-utilisation.mdx";
import Confidentialite from "@/content/legal/fr/confidentialite.mdx";
import Faq from "@/content/legal/fr/faq.mdx";

describe("Légales - routing/présence globale", () => {
  it("affiche un TOC complet et permet de rendre chaque page MDX", () => {
    const tocItems = [
      { slug: "mentions-legales", label: "Mentions légales" },
      { slug: "conditions-utilisation", label: "Conditions d’utilisation" },
      { slug: "confidentialite", label: "Politique de confidentialité" },
      { slug: "faq", label: "FAQ" },
    ];

    render(
      <LegalLayout
        title="Informations légales"
        toc={<LegalToc items={tocItems} basePath="/legal" />}
      >
        <div />
      </LegalLayout>
    );

    // TOC présent avec ses 4 entrées
    expect(
      screen.getByRole("navigation", { name: /Pages légales/i })
    ).toBeInTheDocument();
    [
      /Mentions légales/i,
      /Conditions d’utilisation/i,
      /Politique de confidentialité/i,
      /FAQ/i,
    ].forEach((re) => {
      expect(screen.getByRole("link", { name: re })).toBeInTheDocument();
    });

    // Rendu simple de chaque MDX sans crash
    render(<Mentions />);
    expect(
      screen.getByRole("heading", { name: /Mentions légales/i })
    ).toBeInTheDocument();
    render(<Conditions />);
    expect(
      screen.getByRole("heading", { name: /Conditions d’utilisation/i })
    ).toBeInTheDocument();
    render(<Confidentialite />);
    expect(
      screen.getByRole("heading", { name: /Politique de confidentialité/i })
    ).toBeInTheDocument();
    render(<Faq />);
    expect(
      screen.getByRole("heading", { name: /Foire aux questions/i })
    ).toBeInTheDocument();
  });
});
