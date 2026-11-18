import { Link } from "react-router-dom";

function AlbumCard({ album, onAddToCart }) {
  const detailPath = `/album/${album.id}`;

  return (
    <article className="album-card">
      <Link to={detailPath} className="album-card-link">
        <img src={album.image} alt={`${album.title} cover`} className="album-card-img" />
        <div className="album-card-body">
          <span className="genre-tag">{album.genre}</span>
          <h3>{album.title}</h3>
          <p className="artist">{album.artist}</p>
        </div>
      </Link>

      <div className="album-card-footer">
        <span className="price">${album.price.toFixed(2)}</span>
        {/* the card cant change the cart itself. calls the callback from App */}
        <button
          type="button"
          className="btn btn-primary"
          disabled={album.stock === 0}
          onClick={() => onAddToCart(album)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default AlbumCard;
