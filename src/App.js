// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'; // Import your custom CSS file
import AddMovieForm from './components/AddMovieForm';
import EditMovieForm from './components/EditMovieForm';
import MovieList from './components/MovieList';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Movie Watchlist</h1>
            <nav>
              <ul className="nav-links">
                <li><Link to="/">Movie List</Link></li>
                <li><Link to="/add">Add Movie</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/add" element={<AddMovieForm />} />
              <Route path="/edit/:id" element={<EditMovieForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
