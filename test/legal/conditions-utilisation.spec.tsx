import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Conditions from "@/content/legal/fr/conditions-utilisation.mdx";

describe("Conditions d’utilisation (MDX)", () => {
  it("rend le titre, l'encart Important et quelques sections", () => {
    render(<Conditions />);
    expect(
      screen.getByRole("heading", {
        name: /Conditions d’utilisation/i,
        level: 1,
      })
    ).toBeInTheDocument();

    // Encart Important présent
    expect(screen.getByText(/Important/i)).toBeInTheDocument();
    expect(
      screen.getByText(/personnes majeures \(18\+\)/i)
    ).toBeInTheDocument();

    // Lien vers la Politique de confidentialité depuis la section Données personnelles
    const privacyLinks = screen.getAllByRole("link", {
      name: /Politique de confidentialité/i,
    });
    expect(privacyLinks[0]).toHaveAttribute("href", "/legal/confidentialite");
  });
});
