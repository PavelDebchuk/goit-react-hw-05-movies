import MoviesList from '../../components/MoviesList';
import s from './MoviesPage.module.css';
import { GoSearch } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '../../services/fetchMovies';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [query, setQuery] = useState('');

  const queryValue = searchParams.get('query');

  useEffect(() => {
    if (!queryValue) {
      return;
    }
    fetchSearchMovies(queryValue).then().then(setSearchMovies);
  }, [queryValue]);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchSearchMovies(query).then().then(setSearchMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onHandleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const onQuerySubmit = e => {
    e.preventDefault();
    if (!query) {
      toast.warn('Please, enter movie name');
      return;
    }
    setSearchParams({ query });
  };

  return (
    <>
      <section className={s.moviePage}>
        <form onSubmit={onQuerySubmit} className={s.searchForm}>
          <input
            className={s.inputQuery}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={onHandleChange}
          />
          <button type="submit" className={s.searchButton}>
            <IconContext.Provider value={{ className: `${s.searchIcon}` }}>
              <GoSearch />
            </IconContext.Provider>
          </button>
        </form>
      </section>
      <section>
        {searchMovies && searchMovies.total_results === 0 && (
          <h2>There are no movies matching your search</h2>
        )}
        {searchMovies && <MoviesList response={searchMovies} />}
      </section>
    </>
  );
};

export default MoviesPage;
