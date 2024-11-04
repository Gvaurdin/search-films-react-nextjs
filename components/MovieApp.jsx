import React, { useState, useRef, useEffect } from 'react';
import Observer from './Observer';
import SearchForm from './SearchForm';
import MovieList from './MovieList';
import MovieModal from './MovieModal';
import BackToTopButton from './BackToTopButton';

const MovieSearchApp = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalMovie, setModalMovie] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const apiKey = '5b2ded6c';
    const loaderRef = useRef();

    useEffect(() => {
        if (query) loadMovies();
    }, [currentPage, query]);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${currentPage}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Response === 'True') {
                setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                setError('');
            } else {
                setError(data.Error);
                if (currentPage === 1) setMovies([]);
            }
        } catch (error) {
            console.error('Error loading movies:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setMovies([]);
        setCurrentPage(1);
        setQuery(e.target.searchInput.value);
    };

    const handleLoadMore = () => {
        if (!loading) setCurrentPage((prevPage) => prevPage + 1);
    };

    const showDetails = async (id) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Director !== 'N/A') setModalMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const closeModal = () => setModalMovie(null);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return <>
        <div>
            <header>
                <h1>Movie Search</h1>
                <SearchForm onSubmit={handleSearchSubmit} />
            </header>
            <main>
                {error && <p className="error-message">{error}</p>}
                <MovieList movies={movies} onShowDetails={showDetails} />
                {loading && <div className="loader" ref={loaderRef}></div>}
                {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal} />}
                <Observer onLoadMore={handleLoadMore} />
                {showBackToTop && <BackToTopButton onClick={scrollToTop} />}
            </main>
        </div>
    </>
};

export default MovieSearchApp;

