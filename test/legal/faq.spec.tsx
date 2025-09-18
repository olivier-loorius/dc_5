import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Faq from "@/content/legal/fr/faq.mdx";

describe("FAQ (MDX)", () => {
  it("rend le titre et peut ouvrir un item d'accordéon", async () => {
    render(<Faq />);
    // Titre h1
    expect(
      screen.getByRole("heading", { name: /Foire aux questions/i, level: 1 })
    ).toBeInTheDocument();

    // Un trigger d'accordéon
    const trigger = screen.getByRole("button", {
      name: /Confidentialité de vos données/i,
    });
    await userEvent.click(trigger);

    // Contenu visible après ouverture
    expect(
      await screen.findByText(/Vos données sont utilisées uniquement/i)
    ).toBeInTheDocument();
  });
});
