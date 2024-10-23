import { WishlistProvider, useWishlist } from "@/context/WishlistContext";
import { Movie } from "@/types/movie.types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WishlistPage from "../WishlistPage";

vi.mock("@/components/MovieCard", () => ({
  default: ({ film }: { film: Movie }) => (
    <div data-testid={`movie-card-${film.id}`}>{film.title}</div>
  ),
}));

vi.mock("@/context/WishlistContext", async (importOriginal) => {
  const mod = await importOriginal<
    typeof import("@/context/WishlistContext")
  >();
  return {
    ...mod,
    useWishlist: vi.fn(),
  };
});

describe("WishlistPage", () => {
  it("renders empty wishlist message when wishlist is empty", () => {
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: [],
      addToWishlist: function (): void {
        throw new Error("Function not implemented.");
      },
      removeFromWishlist: function (): void {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <WishlistProvider>
        <WishlistPage />
      </WishlistProvider>
    );

    expect(screen.getByText("Your Wishlist")).toBeInTheDocument();
    expect(screen.getByText("No films in wishlist.")).toBeInTheDocument();
  });

  it("renders movie cards when wishlist has items", () => {
    const mockWishlist: Movie[] = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "/path1.jpg",
        overview: "",
        tagline: "",
        release_date: "",
        runtime: 0,
        genres: [],
        production_companies: [],
        vote_average: 0,
      },
      {
        id: 2,
        title: "Movie 2",
        poster_path: "/path2.jpg",
        overview: "",
        tagline: "",
        release_date: "",
        runtime: 0,
        genres: [],
        production_companies: [],
        vote_average: 0,
      },
    ];
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: mockWishlist,
      addToWishlist: function (): void {
        throw new Error("Function not implemented.");
      },
      removeFromWishlist: function (): void {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <WishlistProvider>
        <WishlistPage />
      </WishlistProvider>
    );

    expect(screen.getByText("Your Wishlist")).toBeInTheDocument();
    expect(screen.queryByText("No films in wishlist.")).not.toBeInTheDocument();
    expect(screen.getByTestId("movie-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("movie-card-2")).toBeInTheDocument();
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });
});
