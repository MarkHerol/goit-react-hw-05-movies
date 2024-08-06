import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../Pages/Shared/SharedModule'; // Check the import path

const HomePage = lazy(() => import('../Pages/Home/HomePage.jsx'));
const MoviesPage = lazy(() => import('../Pages/Movies/MoviesPage.jsx'));
const MovieDetails = lazy(() => import('../Pages/Movie/MoviesDetailPage.jsx'));
const ErrorPage = lazy(() => import('../Pages/ErrorPage'));
const CastList = lazy(() => import('../components/Cast/CastList'));
const ReviewsList = lazy(() => import('../components/Reviews/ReviewList.jsx'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error("Error caught in Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children; 
  }
}

export const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<HomePage />} />
              <Route path="movies" element={<MoviesPage />} />
              <Route path="movies/:movieId" element={<MovieDetails />}>
                <Route path="cast" element={<CastList />} />
                <Route path="reviews" element={<ReviewsList />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};