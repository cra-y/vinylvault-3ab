function Tracklist({ tracks }) {
  return (
    <section className="tracklist">
      <h2>Tracklist</h2>
      <ol>
        {tracks.map((track) => (
          <li key={track}>{track}</li>
        ))}
      </ol>
    </section>
  );
}

export default Tracklist;
