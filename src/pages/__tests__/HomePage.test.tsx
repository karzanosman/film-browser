import { Movie } from "@/types/movie.types";
import * as api from "@/utils/api";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../HomePage";

vi.mock("@/components/Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("@/components/Carousel", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid={`carousel-${title}`}>{title}</div>
  ),
}));

vi.mock("@/utils/api", () => ({
  getMoviesByGenre: vi.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(api.getMoviesByGenre).mockReturnValue(promise as Promise<any>);

    await act(async () => {
      render(<HomePage />);
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await act(async () => {
      resolvePromise!({ results: [] });
    });
  });

  it("renders error message when API call fails", async () => {
    vi.mocked(api.getMoviesByGenre).mockRejectedValue(new Error("API Error"));

    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred while fetching movies.")
      ).toBeInTheDocument();
    });
  });

  it("renders carousels when API calls are successful", async () => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: "Test Movie",
        overview: "",
        poster_path: "",
        tagline: "",
        release_date: "",
        runtime: 0,
        genres: [],
        production_companies: [],
        vote_average: 0,
      },
    ];
    vi.mocked(api.getMoviesByGenre).mockResolvedValue({
      results: mockMovies,
      page: 0,
      total_pages: 0,
      total_results: 0,
    });

    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("carousel-Action Movies")).toBeInTheDocument();
      expect(screen.getByTestId("carousel-Comedy Movies")).toBeInTheDocument();
      expect(screen.getByTestId("carousel-Drama Movies")).toBeInTheDocument();
    });

    expect(api.getMoviesByGenre).toHaveBeenCalledTimes(3);
    expect(api.getMoviesByGenre).toHaveBeenCalledWith(28);
    expect(api.getMoviesByGenre).toHaveBeenCalledWith(35);
    expect(api.getMoviesByGenre).toHaveBeenCalledWith(18);
  });
});
