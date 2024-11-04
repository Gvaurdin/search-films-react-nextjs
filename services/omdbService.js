const apiKey = '5b2ded6c';

export const fetchMovies = async (query, page = 1) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === 'True') {
        return { movies: data.Search, error: '' };
    } else {
        return { movies: [], error: data.Error || 'Failed to fetch data' };
    }
};

export const fetchMovieDetails = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    const data = await response.json();
    return data.Director !== 'N/A' ? data : null;
};