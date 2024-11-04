const MovieModal = ({ movie, onClose }) => (
    <div className="modal show" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>&times;</span>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>Released: {movie.Released}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Country: {movie.Country}</p>
            <p>Director: {movie.Director}</p>
            <p>Writer: {movie.Writer}</p>
            <p>Actors: {movie.Actors}</p>
            <p>Awards: {movie.Awards}</p>
            <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank" rel="noopener noreferrer">
                IMDb Link
            </a>
        </div>
    </div>
);

export default MovieModal;