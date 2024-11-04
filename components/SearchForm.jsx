const SearchForm = ({ onSubmit }) => (
    <form id="searchForm" onSubmit={onSubmit}>
        <input type="text" name="searchInput" placeholder="Search movies..." />
        <button type="submit">Search</button>
    </form>
);

export default SearchForm;