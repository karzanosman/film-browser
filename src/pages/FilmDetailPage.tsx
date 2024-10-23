import Loading from "@/components/Loading";
import { useWishlist } from "@/context/WishlistContext";
import "@/styles/FilmDetailPage.scss";
import { Movie } from "@/types/movie.types";
import { getMovieById } from "@/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FilmDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Movie | null>(null);

  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        const data: Movie = await getMovieById(Number(id));
        const mappedFilm: Movie = {
          id: data.id,
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          tagline: data.tagline,
          release_date: data.release_date,
          runtime: data.runtime,
          genres: data.genres,
          production_companies: data.production_companies || [],
          vote_average: data.vote_average,
        };
        setFilm(mappedFilm);
      }
    };
    fetchDetails();
  }, [id]);

  if (!film) return <Loading />;

  const isInWishlist = wishlist.some((item) => item.id === film.id);

  return (
    <div className="film-detail">
      <div className="film-detail-content">
        <div className="film-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title}
          />
        </div>
        <div className="film-info">
          <h1>{film.title}</h1>
          <p className="tagline">{film.tagline}</p>
          <p className="overview">{film.overview}</p>
          <div className="film-genres">
            {film.genres.map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="release-date">
            Release Date: {new Date(film.release_date).toLocaleDateString()}
          </p>
          <p className="runtime">Runtime: {film.runtime} minutes</p>
          {isInWishlist ? (
            <button
              onClick={() => removeFromWishlist(film.id)}
              className="wishlist-button"
            >
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={() => addToWishlist(film)}
              className="wishlist-button"
            >
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
      <div className="additional-info">
        <h2>Additional Information</h2>
        <div className="info-grid">
          <div className="production-companies">
            <h3>Production Companies</h3>
            <ul>
              {film.production_companies.map((company) => (
                <li key={company.id}>
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                    />
                  )}
                  <span>{company.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="film-details">
            <h3>Film Details</h3>
            <ul>
              <li>
                <strong>Original Title:</strong> {film.title}
              </li>
              <li>
                <strong>Release Date:</strong>{" "}
                {new Date(film.release_date).toLocaleDateString()}
              </li>
              <li>
                <strong>Runtime:</strong> {film.runtime} minutes
              </li>
              <li>
                <strong>Genres:</strong>{" "}
                {film.genres.map((g) => g.name).join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
