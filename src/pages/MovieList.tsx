import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Movie } from '../types/Movie';
import '../styles/MovieList.scss'; // Optional: Add SCSS file for custom styles.

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('movie');
  const [searchQuery, setSearchQuery] = useState('Pokemon');
  const [year, setYear] = useState<number | ''>('');

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery, year, searchType]);

  const fetchMovies = async () => {
    if (!searchQuery.trim()) return;

    try {
      const { data } = await axios.get(`http://www.omdbapi.com/`, {
        params: {
          apikey: process.env.REACT_APP_OMDB_API_KEY,
          s: searchQuery,
          type: searchType || undefined,
          y: year || undefined,
          page: currentPage,
        },
      });
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Movie Finder</h1>
      <div className="filters mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Year"
            value={year || ''}
            onChange={(e) => setYear(Number(e.target.value) || '')}
          />
        </div>
        <div className="mb-3">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              value=""
              checked={searchType === ''}
              onChange={() => setSearchType('')}
            />
            <label className="form-check-label">All</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              value="movie"
              checked={searchType === 'movie'}
              onChange={() => setSearchType('movie')}
            />
            <label className="form-check-label">Movies</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              value="series"
              checked={searchType === 'series'}
              onChange={() => setSearchType('series')}
            />
            <label className="form-check-label">TV Series</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              value="episode"
              checked={searchType === 'episode'}
              onChange={() => setSearchType('episode')}
            />
            <label className="form-check-label">Episodes</label>
          </div>
        </div>
      </div>
      <div className="movie-list">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th>Release Date</th>
              <th>IMDb ID</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.imdbID}>
                <td>
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100'}
                    alt={movie.Title}
                    className="img-thumbnail"
                    style={{ width: '80px' }}
                  />
                </td>
                <td>
                  <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none">
                    {movie.Title}
                  </Link>
                </td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-buttons mt-3 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
