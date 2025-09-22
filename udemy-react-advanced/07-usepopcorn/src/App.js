import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';

const KEY = process.env.REACT_APP_OMDB_KEY;


export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const query = 'interstellar';

    useEffect(function () {
        async function fetchMovies() {
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
            );
            const data = await res.json();
            setMovies(data.Search);
        }
        fetchMovies();
    }, []);

    return (
        <>
            <NavBar>
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    <MovieList movies={movies} />
                </Box>
                <Box>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </Box>
            </Main>
        </>
    );
}
