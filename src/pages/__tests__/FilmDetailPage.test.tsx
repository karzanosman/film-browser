import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WishlistProvider } from "@/context/WishlistContext";
import * as api from "@/utils/api";
import * as router from "react-router-dom";
import FilmDetailPage from "../FilmDetailPage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock("@/utils/api", () => ({
  getMovieById: vi.fn(),
}));

const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "This is a test movie",
  poster_path: "/test-poster.jpg",
  tagline: "A great test movie",
  release_date: "2023-01-01",
  runtime: 120,
  genres: [{ id: 1, name: "Action" }],
  production_companies: [
    { id: 1, name: "Test Studio", logo_path: "/test-logo.png" },
  ],
  vote_average: 8.5,
};

describe("FilmDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(router.useParams).mockReturnValue({ id: "1" });
    vi.mocked(api.getMovieById).mockResolvedValue(mockMovie);
  });

  it("renders component", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <WishlistProvider>
          <FilmDetailPage />
        </WishlistProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Add to Wishlist")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Add to Wishlist"));
    expect(screen.getByText("Remove from Wishlist")).toBeInTheDocument();

    await user.click(screen.getByText("Remove from Wishlist"));
    expect(screen.getByText("Add to Wishlist")).toBeInTheDocument();
  });
});
