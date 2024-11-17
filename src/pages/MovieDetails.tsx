import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Movie } from '../types/Movie';
import '../styles/MovieDetails.scss';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`http://www.omdbapi.com/`, {
          params: { apikey: process.env.REACT_APP_OMDB_API_KEY, i: id },
        });

        if (data.Response === "False") {
          setError(data.Error || "Failed to fetch movie details.");
          setMovie(null);
        } else {
          setMovie(data);
          setError(null);
        }
      } catch (err) {
        setError("An error occurred while fetching movie details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container movie-details mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Movie List
      </Link>
      <div className="row">
        <div className="col-md-4">
          <img
            src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/300"}
            alt={movie?.Title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h1 className="mb-3">{movie?.Title}</h1>
          <p>{movie?.Plot}</p>
          <ul className="list-unstyled">
            <li><strong>Genre:</strong> {movie?.Genre}</li>
            <li><strong>Director:</strong> {movie?.Director}</li>
            <li><strong>Cast:</strong> {movie?.Actors}</li>
            <li><strong>IMDb Rating:</strong> {movie?.imdbRating}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
