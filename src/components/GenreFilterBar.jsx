function GenreFilterBar({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="filter-bar">
      {/* arrow function with ( ) returns the JSX automatically */}
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`filter-pill ${selectedGenre === genre ? "active" : ""}`}
          aria-pressed={selectedGenre === genre}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilterBar;
