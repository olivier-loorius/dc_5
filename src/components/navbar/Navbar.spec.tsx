import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import Providers from "@/app/providers";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}

describe("Navbar", () => {
  it("ouvre et ferme le menu burger", () => {
    render(<Navbar />, { wrapper: Wrapper });
    const burger = screen.getByLabelText(/Menu/i);
    fireEvent.click(burger);
    const title = screen.getByText(/Menu/i);
    const nav = title.closest("nav") as HTMLElement;
    expect(nav).toBeInTheDocument();
    expect(within(nav).getByText(/Nouveautés/i)).toBeInTheDocument();
    fireEvent.click(within(nav).getByText(/Nouveautés/i));
    expect(screen.queryByText(/Menu/i)).not.toBeInTheDocument();
  });

  it("ouvre la recherche mobile et focus le champ", () => {
    render(<Navbar />, { wrapper: Wrapper });
    const searchBtn = screen.getAllByLabelText(/Rechercher/i)[0];
    fireEvent.click(searchBtn);
    const cancelBtn = screen.getByText(/Annuler/i);
    const form = cancelBtn.closest("form") as HTMLElement;
    const searchInput = within(form).getByRole("searchbox") as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });
});
