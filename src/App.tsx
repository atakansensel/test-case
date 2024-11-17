import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
