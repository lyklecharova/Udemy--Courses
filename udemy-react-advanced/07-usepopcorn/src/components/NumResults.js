function NumResults({ movies }) {
    if (!Array.isArray(movies)) return null;
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}
export default NumResults;
