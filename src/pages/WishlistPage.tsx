import MovieCard from "@/components/MovieCard";
import { useWishlist } from "@/context/WishlistContext";
import "@/styles/WishlistPage.scss";
import { Movie } from "@/types/movie.types";

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist(); 

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">No films in wishlist.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((film: Movie) => (
            <MovieCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
