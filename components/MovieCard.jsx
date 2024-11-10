import { memo } from 'react';

const MovieCard = memo(({ movie, onShowDetails }) => {
    console.log("Render MovieCard");
    return (
        <div className="movie">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'images/placeholder.png'} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p className="type">{movie.Type === 'movie' ? 'Film' : 'Series'}</p>
            <p className="year">{movie.Year}</p>
            <button onClick={() => onShowDetails(movie.imdbID)}>Details</button>
        </div>
    );
});

export default MovieCard;