import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../Header";

describe("Header Component", () => {
  const renderHeader = () => {
    return render(
      <Router>
        <Header />
      </Router>
    );
  };

  it("renders header with title and navigation links", () => {
    renderHeader();

    const titleElement = screen.getByText("Film Browser");
    expect(titleElement).toBeInTheDocument();

    const navLinks = ["Home", "Wishlist"];

    navLinks.forEach((linkText) => {
      const linkElement = screen.getByText(linkText);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it("navigates to the correct pages when links are clicked", () => {
    renderHeader();

    const homeLink = screen.getByText("Home");
    const wishlistLink = screen.getByText("Wishlist");

    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
    expect(wishlistLink.closest("a")).toHaveAttribute("href", "/wishlist");
  });

  it("applies correct styling and structure", () => {
    renderHeader();

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("header");
  });

  it("meets accessibility requirements", () => {
    renderHeader();
  });
});
