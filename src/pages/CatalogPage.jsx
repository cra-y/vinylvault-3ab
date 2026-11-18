import { useState } from "react";
import CatalogHero from "../components/CatalogHero";
import GenreFilterBar from "../components/GenreFilterBar";
import AlbumGrid from "../components/AlbumGrid";

const GENRES = ["All", "Jazz", "Electronic", "Rock", "Classical"];

function CatalogPage({ albums, onAddToCart }) {
  // local state: only this page cares which genre is selected
  const [selectedGenre, setSelectedGenre] = useState("All");

  // recalculated on every render from albums + selectedGenre
  // .filter() returns a new array so the original albums data is never changed
  const filteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter((album) => album.genre === selectedGenre);

  return (
    <div className="catalog">
      <CatalogHero />
      {/* setSelectedGenre is passed down as the callback so the filter bar can change state it doesnt own */}
      <GenreFilterBar
        genres={GENRES}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />
      <AlbumGrid albums={filteredAlbums} onAddToCart={onAddToCart} />
    </div>
  );
}

export default CatalogPage;
