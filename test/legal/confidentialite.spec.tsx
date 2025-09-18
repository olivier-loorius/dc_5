import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Confidentialite from "@/content/legal/fr/confidentialite.mdx";

describe("Politique de confidentialité (MDX)", () => {
  it("rend le titre et le paragraphe d'introduction RGPD", () => {
    render(<Confidentialite />);
    expect(
      screen.getByRole("heading", {
        name: /Politique de confidentialité/i,
        level: 1,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/expérience sûre, discrète et conforme au rgpd/i)
    ).toBeInTheDocument();
  });
});
