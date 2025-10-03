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

const KEY = process.env.REACT_APP_OMDB_KEY;

export default function App() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
    async function fetchMovies(searchQuery) {
        try {
            if (!searchQuery) return;

            setIsLoading(true);
            setError("");

            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${KEY}&s=${searchQuery}`
            );
            const data = await res.json();

            if (data.Response === "False") {
                setError(data.Error);
                setMovies([]);
            } else {
                setMovies(data.Search);
            }
        } catch {
            setError("Something went wrong fetching movies.");
        } finally {
            setIsLoading(false);
        }
    }

    // Initial fetch
    if (!query) fetchMovies("interstellar");
    else fetchMovies(query);
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
                    {!isLoading && !error && <MovieList movies={movies} />}
                </Box>
                <Box>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </Box>
            </Main>
        </>
    );
}
