import Header from "@/components/Header";
import { WishlistProvider } from "@/context/WishlistContext";
import FilmDetailPage from "@/pages/FilmDetailPage";
import HomePage from "@/pages/HomePage";
import WishlistPage from "@/pages/WishlistPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <WishlistProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<FilmDetailPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
};

export default App;