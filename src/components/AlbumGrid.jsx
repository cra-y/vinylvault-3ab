import AlbumCard from "./AlbumCard";

function AlbumGrid({ albums, onAddToCart }) {
  if (albums.length === 0) {
    return <p className="empty-state">No albums in this genre yet.</p>;
  }

  return (
    <div className="album-grid">
      {/* key must be unique, so we use album.id (not the array index) */}
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default AlbumGrid;
