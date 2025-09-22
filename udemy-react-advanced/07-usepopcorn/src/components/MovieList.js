import Movie from './Movie';

function MovieList({ movies }) {
    if (!Array.isArray(movies)) return null;
    return (
        <ul className="list">
            {movies.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}
export default MovieList;
