import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import Observer from './Observer';
import SearchForm from './SearchForm';
import MovieList from './MovieList';
import BackToTopButton from './BackToTopButton';
import { fetchMovies, fetchMovieDetails } from '@/services/omdbService';

const MovieModal = lazy(() => import('./MovieModal'));

const MovieSearchApp = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalMovie, setModalMovie] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const loaderRef = useRef();

    useEffect(() => {
        if (query) loadMovies();
    }, [currentPage, query]);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMovies = useCallback(async () => {
        setLoading(true);
        const { movies: newMovies, error: fetchError } = await fetchMovies(query, currentPage);
        if (!fetchError) {
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
            setError('');
        } else {
            setError(fetchError);
            if (currentPage === 1) setMovies([]);
        }
        setLoading(false);
    }, [query, currentPage]);

    const handleSearchSubmit = useCallback((e) => {
        e.preventDefault();
        setMovies([]);
        setCurrentPage(1);
        setQuery(e.target.searchInput.value);
    }, []);

    const handleLoadMore = useCallback(() => {
        if (!loading) setCurrentPage((prevPage) => prevPage + 1);
    }, [loading]);

    const showDetails = useCallback(async (id) => {
        const movie = await fetchMovieDetails(id);
        if (movie) setModalMovie(movie);
    }, []);

    const closeModal = useCallback(() => setModalMovie(null), []);

    const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <div>
            <header>
                <h1>Movie Search</h1>
                <SearchForm onSubmit={handleSearchSubmit} />
            </header>
            <main>
                {error && <p className="error-message">{error}</p>}
                <MovieList movies={movies} onShowDetails={showDetails} />
                {loading && <div className="loader" ref={loaderRef}></div>}
                {modalMovie && (
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <MovieModal movie={modalMovie} onClose={closeModal} />
                    </Suspense>
                )}
                <Observer onLoadMore={handleLoadMore} />
                {showBackToTop && <BackToTopButton onClick={scrollToTop} />}
            </main>
        </div>
    );
};

export default MovieSearchApp;
