import { memo } from 'react';

const SearchForm = memo(({ onSubmit }) => {
    console.log("Render SearchForm");
    return (
        <form id="searchForm" onSubmit={onSubmit}>
            <input type="text" name="searchInput" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
});

export default SearchForm;