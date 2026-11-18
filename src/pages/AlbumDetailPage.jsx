import { useParams, Link } from "react-router-dom";
import AlbumSpecs from "../components/AlbumSpecs";
import Tracklist from "../components/Tracklist";

function AlbumDetailPage({ albums, onAddToCart }) {
  // Read the :albumId part of the URL. No state needed: the URL IS the selection.
  const { albumId } = useParams();
  const album = albums.find((a) => a.id === albumId);

  // edge case: someone types /album/album-that-does-not-exist
  if (!album) {
    return (
      <div className="not-found">
        <h2>Album not found</h2>
        <Link to="/" className="btn">Back to catalog</Link>
      </div>
    );
  }

  return (
    <div className="album-detail">
      <Link to="/" className="back-link">&larr; Back to catalog</Link>

      <div className="album-detail-grid">
        <img src={album.image} alt={`${album.title} cover`} className="album-detail-img" />

        <div className="album-detail-info">
          <span className="genre-tag">{album.genre}</span>
          <h1>{album.title}</h1>
          <p className="artist">{album.artist}</p>
          <p className="price price-lg">${album.price.toFixed(2)}</p>
          <p className="description">{album.description}</p>

          <button
            type="button"
            className="btn btn-primary"
            disabled={album.stock === 0}
            onClick={() => onAddToCart(album)}
          >
            Add to Cart
          </button>

          <AlbumSpecs specs={album.specs} stock={album.stock} />
          <Tracklist tracks={album.tracklist} />
        </div>
      </div>
    </div>
  );
}

export default AlbumDetailPage;
