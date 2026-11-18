// display-only turns the nested specs object + stock number into a list
function AlbumSpecs({ specs, stock }) {
  let stockStatus;
  if (stock === 0) stockStatus = "Out of stock";
  else if (stock <= 5) stockStatus = `Only ${stock} left`;
  else stockStatus = `In stock (${stock})`;

  return (
    <section className="album-specs">
      <h2>Pressing Details</h2>
      <dl>
        <dt>Catalog #</dt>
        <dd>{specs.catalogNumber}</dd>
        <dt>Weight</dt>
        <dd>{specs.weight}</dd>
        <dt>Speed</dt>
        <dd>{specs.speed}</dd>
        <dt>Label</dt>
        <dd>{specs.label}</dd>
        <dt>Availability</dt>
        <dd className={stock <= 5 ? "low-stock" : ""}>{stockStatus}</dd>
      </dl>
    </section>
  );
}

export default AlbumSpecs;
