// import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './App.module.css';
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalMovie, setIsModalMovie] = useState<Movie | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [userValue, setUserValue] = useState('');

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movie', userValue, currentPage],
    queryFn: () => fetchMovies(userValue, currentPage),
    enabled: userValue !== '',
    placeholderData: keepPreviousData,
  });

  // console.log('useQuery data:', data);

  if (data && data.results.length === 0) {
    toast.error('No movies found for your request.');
  }

  const totalPages = data?.total_pages ?? 0;

  const handleSearch = async (value: string) => {
    setUserValue(value);
    setCurrentPage(1);
  };
  function handleClick(movie: Movie) {
    setIsModalMovie(movie);
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
    setIsModalMovie(null);
  }
  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel='→'
          previousLabel='←'
        />
      )}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
          onSelect={handleClick}
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isModalOpen && isModalMovie && (
        <MovieModal
          movie={isModalMovie}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;

// try {
//   setError(false);
//   setMovies([]);
//   setIsLoading(true);
//   const dataMovie = await fetchMovies(data);
//   setMovies(dataMovie);
//   if (dataMovie.length === 0) {
//     toast.error('No movies found for your request.');
//   }
// } catch {
//   setError(true);
//   // console.log(error);
// } finally {
//   setIsLoading(false);
// }
