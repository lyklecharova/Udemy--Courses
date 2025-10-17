import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';

const KEY = process.env.REACT_APP_OMDB_KEY;

export default function App() {
    const [query, setQuery] = useState('inception ');
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }
    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                );

                if (!res.ok) {
                    throw new Error(
                        'Something went wrong with fetching movies'
                    );
                }

                const data = await res.json();

                if (data.Response === 'False')
                    throw new Error('Movie not found!');

                setMovies(data.Search);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }
        fetchMovies();
    }, [query]);

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onSelectMovie={handleCloseMovie}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
