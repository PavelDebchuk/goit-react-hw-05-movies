import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../services/fetchMovies';
import HTag from '../../components/HTag';
import MoviesList from '../../components/MoviesList/MoviesList';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    fetchPopularMovies().then(setPopularMovies);
  }, []);
  return (
    <section className={s.homePage}>
      <HTag title="Trending Today" />
      {popularMovies && <MoviesList response={popularMovies} />}
    </section>
  );
};

export default HomePage;
