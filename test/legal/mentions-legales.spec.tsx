import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Mentions from "@/content/legal/fr/mentions-legales.mdx";

describe("Mentions légales (MDX)", () => {
  it("rend le titre et les sections clés", () => {
    render(<Mentions />);
    expect(
      screen.getByRole("heading", { name: /Mentions légales/i, level: 1 })
    ).toBeInTheDocument();

    // Sections usuelles présentes
    expect(screen.getByText(/Éditeur du site/i)).toBeInTheDocument();
    expect(screen.getByText(/Hébergeur/i)).toBeInTheDocument();

    // Lien vers Politique de confidentialité
    const privacyLinks = screen.getAllByRole("link", {
      name: /Politique de confidentialité/i,
    });
    expect(privacyLinks[0]).toHaveAttribute("href", "/legal/confidentialite");
  });
});
