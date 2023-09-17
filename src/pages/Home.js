import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo_white.svg"
import johnWickPoster from "../Poster.png"
import {HiMiniBars2} from "react-icons/hi2"
import {HiOutlineSearch} from "react-icons/hi"

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = () => {
    const apiKey = "157f8b6f3dd6720eb58c49ebb5454947";
    const API_URL = `https://api.themoviedb.org/3/search/movie/?query=${query}&api_key=${apiKey}`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="Movie-search">
      <input
       className="search-input" type="text" placeholder="What do you want to watch?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn" onClick={searchMovies}><HiOutlineSearch /></button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
    return (
  <header className="Home-header">
    <div className="Home-header-items">
      <span><img src={logo} alt="Logo" /></span>
      <MovieSearch />
      <button className="signin-btn">Sign in <span><HiMiniBars2 /></span></button>
    </div>
  </header>
    )
}

function Hero() {
  return (
    <section className="Home-hero" style={{background: `url(${johnWickPoster})`, backgroundSize: "cover"}}>
      <div className="Home-hero-item">
        <div className="hero-description">
          <h1 className="hero-title">John Wick 3 : Parabellum</h1>
          <div className="hero-rating">
            <span className="imdb-rating">86.0/100</span>
            <span className="tomatoes-rating">97%</span>
          </div>
          <p class="hero-overview">
            John Wick is on the run after killing a member of the international
            assassins guild, and with a $14 million price tag on his head, he is
            the target of hit men and women everywhere.
          </p>
          <a className="watch-link" href="https//">WATCH TRAILER</a>
        </div>
      </div>
      <div className="hero-pagination">
        <div>1</div>
        <div>2</div>
        <div className="active">3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </section>
  );
}

function MovieCard(props) {
    return (
        <div className="Movie-card" data-testid="movie-card">
        <Link to={`/movies/${props.movie.id}`}>
        <img className="movie-poster" src={props.movie.poster_path} alt={props.movie.title} data-testid="movie-poster" />
        </Link>
        <div className="movie-decription">
          <p className="movie-prodution faint"><span>USA</span>, <span data-testid="movie-release-date">{ props.movie.release_date}</span></p>
          <h4 className="movie-title" data-testid="movie-title">{ props.movie.title }</h4>
          <div className="movie-rating">
            <span className="imdb-rating">86.0/100</span>
            <span className="tomatoes-rating">97%</span>
          </div>
          <p className="movie-tags faint">Action, Adventure, Horror</p>
        </div>
      </div>
    )
}

function Movies() {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
      // Fetch top ten movies from TMDB API
      const fetchTopMovies = async () => {
        const apiKey = "157f8b6f3dd6720eb58c49ebb5454947";
        try {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
            );
            const data = await response.json();
            setTopMovies(data.results.slice(0, 10));
          } catch (error) {
            console.error(error);
            alert(error)
          }
        };
    
        fetchTopMovies();
      }, []);
    
      if (topMovies.length === 0) {
        return <div>Loading top movies...</div>;
      }

    return (
  <section className="Home-movies-wrapper">
    <div className="movies-wrapper-header">
      <h1>Featured Movie</h1>
      <a className="see-more-link" href="https//">See more</a>
    </div>
    <div className="movies-grid">
    { topMovies.map((movie) => <MovieCard key={ movie.id } movie={ movie } />)}
    </div>
  </section>
    )
} 

function Footer() {
    return (
  <footer className="Home-footer">
    <div className="Footer-socials">
      <a href="https//">Facebook</a>
      <a href="https//">Instagram</a>
      <a href="https//">Twitter</a>
      <a href="https//">Youtube</a>
    </div>
    <div className="Footer-links">
      <a href="https//">Conditions of Use</a>
      <a href="https//">Policy & Privacy</a>
      <a href="https//">Press Room</a>
    </div>
    <p className="Footer-copyright faint">© 2021 MovieBox by Adriana Eka Prayudha </p>
  </footer>
    )
}

function Home() {
  return (
    <div className="Home">
      <Header />
      <Hero />
      <Movies />
      <Footer />
    </div>
  );
}

export default Home;