import './App.css';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ToastContainer } from 'react-toastify';
import Cast from './components/Cast/Cast';
import Reviews from './components/Reviews/Reviews';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage.jsx' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.jsx' /* webpackChunkName: "movies-detail" */
  ),
);
const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.jsx' /* webpackChunkName: "movies-page" */
  ),
);

function App() {
  return (
    <section>
      <ToastContainer />
      <Navigation />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />}>
            <Route path="/movies/:id/cast" element={<Cast />} />
            <Route path="/movies/:id/reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
    </section>
  );
}

export default App;
