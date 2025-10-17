import Movie from './Movie';

function MovieList({ movies, onSelectMovie }) {
    if (!Array.isArray(movies)) return null;
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}
export default MovieList;
