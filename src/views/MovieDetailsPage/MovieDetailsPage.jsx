import s from './MovieDetailsPage.module.css';
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useState, useEffect, useRef } from 'react';
import { fetchMovieDetails } from '../../services/fetchMovies';
import { GoArrowLeft } from 'react-icons/go';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const locationHistory = useRef(location);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovieDetails);
  }, [id]);

  const onClickGoBackButon = () => {
    navigate(locationHistory?.current?.state?.from || '/');
  };

  return (
    movieDetails && (
      <section className={s.movieDetails}>
        <div className={s.buttonBox}>
          <button
            type="butoon"
            onClick={onClickGoBackButon}
            className={s.goBackButton}
          >
            <IconContext.Provider value={{ className: `${s.searchIcon}` }}>
              <GoArrowLeft />
            </IconContext.Provider>
            Go Back
          </button>
        </div>
        <div className={s.movieBox}>
          <div className={s.imageBox}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
                  : `https://cdn.pixabay.com/photo/2016/03/31/18/36/cinema-1294496_1280.png`
              }
              alt={movieDetails.original_title}
              width="300"
            />
          </div>
          <div className={s.infoBox}>
            <h1 className={s.title}>{movieDetails.original_title} </h1>
            <p className={s.userScore}>{`User Score: ${
              movieDetails.vote_average * 10
            }%`}</p>
            <h2 className={s.overview}>Overview</h2>
            <p className={s.overviewDescription}>{movieDetails.overview}</p>
            <h3 className={s.genres}>Genres</h3>
            <p>
              {movieDetails.genres.map(genre => (
                <span key={genre.id} className={s.genreItem}>
                  {genre.name}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div>
          <h3 className={s.additInfo}>Additional information</h3>
          <ul className={s.linkList}>
            <li>
              <Link className={s.link} to="cast" location={location}>
                Cast
              </Link>
            </li>
            <li>
              <Link className={s.link} to="reviews">
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet location={location} />
        </div>
      </section>
    )
  );
};

export default MovieDetailsPage;
