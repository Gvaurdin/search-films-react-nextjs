import MovieCard from './MovieCard';

const MovieList = ({ movies, onShowDetails }) => (
    <div id="movies">
        {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onShowDetails={onShowDetails} />
        ))}
    </div>
);

export default MovieList;